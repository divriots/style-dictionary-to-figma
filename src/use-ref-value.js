/**
 * @typedef {import('./style-dictionary-to-figma.js').Obj} Obj
 */

/**
 * @param {Obj} obj
 * @returns {Obj}
 */
export function useRefValue(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (key === 'original') {
      newObj.value = /** @type {Obj} */ (newObj[key]).value;
    } else if (typeof newObj[key] === 'object') {
      newObj[key] = useRefValue(/** @type {Obj} */ (newObj[key]));
    }
  });
  return newObj;
}
