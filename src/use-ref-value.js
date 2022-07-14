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
    if (key === 'original' && !newObj.ignoreUseRefValue) {
      newObj.value = /** @type {Obj} */ (newObj[key]).value;
    } else if (typeof newObj[key] === 'object') {
      const newValue = useRefValue(/** @type {Obj} */ (newObj[key]));
      newObj[key] = Array.isArray(newObj[key]) ? Object.values(newValue) : newValue;
    }
  });
  return newObj;
}
