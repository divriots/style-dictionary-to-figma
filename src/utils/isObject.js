/**
 * @param {any} val
 * @returns {boolean}
 */
export function isObject(val) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}
