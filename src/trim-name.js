/**
 * @typedef {import('./style-dictionary-to-figma.js').Obj} Obj
 */

/**
 * @param {Obj} obj
 * @returns {Obj}
 */
export function trimName(obj) {
  const newObj = { ...obj };

  Object.keys(newObj).forEach(key => {
    if (key === 'name') {
      delete newObj[key];
    } else if (typeof newObj[key] === 'object') {
      const newValue = trimName(/** @type {Obj} */ (newObj[key]));
      newObj[key] = Array.isArray(newObj[key]) ? Object.values(newValue) : newValue;
    }
  });

  return newObj;
}
