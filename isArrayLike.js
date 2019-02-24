import isLength from './isLength.js';

function isArrayLike(value) {
  return value != null && typeof value != 'function' && isLength(value.length);
}

export default isArrayLike;
