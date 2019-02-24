/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */

/**
 * isObject方法用来判断传入的参数是否为一个'对象'，若是则返回true，否则返回false
 */
function isObject(value) {
  const type = typeof value;
  // typeof null === 'object' 判断结果为true
  return value != null && (type == 'object' || type == 'function');
}

export default isObject;
