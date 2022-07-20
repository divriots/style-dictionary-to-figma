/**
 * @typedef {import('./style-dictionary-to-figma.js').Obj} Obj
 * @typedef {string|Object|Array<unknown>|number} Value
 */

/**
 * @param {Value} val
 * @returns {boolean}
 */
function isRefValue(val) {
  if (Array.isArray(val)) {
    return val.some(prop => isRefValue(/** @type {Value} */ (prop)));
  }

  if (typeof val === 'string') {
    return val.startsWith('{') && val.endsWith('}');
  }

  if (typeof val === 'number') {
    return false;
  }

  return Object.values(val).some(prop => isRefValue(prop));
}

/**
 * @param {Obj} obj
 * @returns {Obj}
 */
export function useRefValue(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (key === 'original' && !newObj.ignoreUseRefValue) {
      const originalValue = /** @type {string} */ (/** @type {Obj} */ (newObj[key]).value);
      if (isRefValue(originalValue)) {
        newObj.value = /** @type {Obj} */ (newObj[key]).value;
      }
    } else if (typeof newObj[key] === 'object') {
      const newValue = useRefValue(/** @type {Obj} */ (newObj[key]));
      newObj[key] = Array.isArray(newObj[key]) ? Object.values(newValue) : newValue;
    }
  });
  return newObj;
}
