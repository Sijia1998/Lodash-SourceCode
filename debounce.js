import isObject from './isObject.js';
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them. Provide `options` to indicate
 * whether `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. The `func` is invoked with the last arguments provided to the
 * debounced function. Subsequent calls to the debounced function return the
 * result of the last `func` invocation.
 */
/**
 * Lodash防抖函数
 */

function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

  // 初始化各项参数
  let lastInvokeTime = 0; // func上一次执行的时间，初始化为0
  let leading = false;
  let maxing = false;
  let trailing = true;

  // 判断传入的func的类型是不是'function',若不是则抛出错误
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  // 若不传入参数wait，则wait默认为0
  wait = +wait || 0;
  if (isObject(func)) {
    // 对配置的一些初始化
    leading = !!options.leading; // !!(XX)和执行Boolen(XX)的效果是一样的，只是一个编程技巧
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);

    return result;
  }

  // function startTimer(pendingFunc,wait){}
  // function cancelTimer(id){}

  function leadingEdge(time) {
    // Reset any `maxWait` timer
    lastInvokeTime = time;
    // 为 trailing edge 触发函数调用设定定时器
    timerId = setTimeout(timerExpired, wait);
    // leading = true 执行函数
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime; // 距离上次debounced函数被调用的时间
    const timeSinceLastInvoke = time - lastInvokeTime; // 距离上次函数被执行的时间
    const timeWaiting = wait - timeSinceLastCall; // 用 wait 减去 timeSinceLastCall 计算出下一次trailing的位置

    // 两种情况
    // 有maxing:比较出下一次maxing和下一次trailing的最小值，作为下一次函数要执行的时间
    // 无maxing：在下一次trailing时执行 timerExpired
    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  // 根据时间判断 func 能否被执行
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // 几种满足条件的情况
    return (
      lastCallTime === undefined || //首次
      timeSinceLastCall >= wait || // 距离上次被调用已经超过 wait
      timeSinceLastCall < 0 || //系统时间倒退
      (maxing && timeSinceLastInvoke >= maxWait)
    ); //超过最大等待时间
  }

  function timerExpired() {
    const time = Date.now();
    // 在 trailing edge 且时间符合条件时，调用 trailingEdge函数，否则重启定时器
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // 重启定时器，保证下一次时延的末尾触发
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // 有lastArgs才执行，意味着只有 func 已经被 debounced 过一次以后才会在 trailing edge 执行
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    // 每次 trailingEdge 都会清除 lastArgs 和 lastThis，目的是避免最后一次函数被执行了两次
    // 举个例子：最后一次函数执行的时候，可能恰巧是前一次的 trailing edge，函数被调用，而这个函数又需要在自己时延的 trailing edge 触发，导致触发多次
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {}

  function flush() {}

  function pending() {}

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time); //是否满足时间条件

    lastArgs = args;
    lastThis = this;
    lastCallTime = time; //函数被调用的时间

    if (isInvoking) {
      if (timerId === undefined) {
        // 无timerId的情况有两种：1.首次调用 2.trailingEdge执行过函数
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    // 负责一种case：trailing 为 true 的情况下，在前一个 wait 的 trailingEdge 已经执行了函数；
    // 而这次函数被调用时 shouldInvoke 不满足条件，因此要设置定时器，在本次的 trailingEdge 保证函数被执行
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}

export default debounce;
