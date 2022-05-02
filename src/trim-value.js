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
      } else if (typeof newObj[key] === 'object') {
        newObj[key] = trimValue(/** @type {Obj} */ (newObj[key]), true);
      }
    } else if (typeof newObj[key] === 'object') {
      newObj[key] = trimValue(/** @type {Obj} */ (newObj[key]));
    }
  });
  return newObj;
}
