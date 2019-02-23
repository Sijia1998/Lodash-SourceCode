/** Detect free variable `global` from Node.js. */
/** 从Node.js中全局检测自由变量 */
const freeGlobal = typeof global == 'object' && global !== null && global.Object === Object && global

export default freeGlobal