import { isObject } from './utils/isObject.js';
/**
 * @typedef {import('./style-dictionary-to-figma.js').Obj} Obj
 */

/**
 * @param {Obj} obj
 * @param {boolean} isValueObj
 * @returns {Obj}
 */
export function trimValue(obj, isValueObj = false) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (key === 'value' || isValueObj) {
      if (typeof newObj[key] === 'string') {
        const val = /** @type {string} */ (newObj[key]);
        const reg = /^\{(.*)\}$/g;
        const matches = reg.exec(val);
        if (matches && matches[1]) {
          newObj[key] = val.replace('.value', '');
        }
      } else if (isObject(newObj[key]) || Array.isArray(newObj[key])) {
        const newValue = trimValue(/** @type {Obj} */ (newObj[key]), true);
        newObj[key] = Array.isArray(newObj[key]) ? Object.values(newValue) : newValue;
      }
    } else if (isObject(newObj[key])) {
      newObj[key] = trimValue(/** @type {Obj} */ (newObj[key]));
    }
  });
  return newObj;
}
