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
/**Lodash防抖函数 */

function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

  // 初始化各项参数
  let lastInvokeTime = 0; // func上一次执行的时间，初始化为0
  let leading = false;
  let maxing = false;
  let trailing = true;

  // 判断传入的func的类型是不是'function',若不是则抛出错误
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  // 若不传入参数wait，则wait默认为0
  wait = +wait || 0;

  
}

export default debounce;
