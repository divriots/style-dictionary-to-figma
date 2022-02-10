/**
 * @typedef {import('./style-dictionary-to-figma.js').Obj} Obj
 */

/**
 * @param {Obj} obj
 * @returns {Obj}
 */
export function markTokenset(obj) {
  const _obj = { ...obj };
  Object.keys(_obj).forEach(key => {
    if (typeof _obj[key] === 'object') {
      // typeof check so we know it's an object
      const nestedObj = /** @type {Obj} */ (_obj[key]);
      Object.keys(nestedObj).forEach(nestedKey => {
        if (nestedKey === 'tokenset') {
          // tokenset value may only be string
          const tokenset = /** @type {string} */ (nestedObj[nestedKey]);
          if (typeof _obj[tokenset] !== 'object') {
            _obj[tokenset] = {};
          }
          /** @type {Obj} */ (_obj[tokenset])[key] = nestedObj;

          // ignore otherwise it mucks up the parenths needed for JSDoc typecast
          // prettier-ignore
          delete (/** @type {Obj} */ (_obj[key])[nestedKey]);
          delete _obj[key];
        }
      });
    }
  });
  return _obj;
}
