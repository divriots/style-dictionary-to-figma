import { isObject } from './utils/isObject.js';

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
    if (isObject(_obj[key])) {
      // check so we know it's an object
      const nestedObj = /** @type {Obj} */ (_obj[key]);
      Object.keys(nestedObj).forEach(nestedKey => {
        if (nestedKey === 'tokenset') {
          // tokenset value may only be string
          const tokenset = /** @type {string} */ (nestedObj[nestedKey]);
          // ignore otherwise it mucks up the parenths needed for JSDoc typecast
          // prettier-ignore
          delete (/** @type {Obj} */ (_obj[key])[nestedKey]);

          if (!isObject(_obj[tokenset])) {
            _obj[tokenset] = {};
          }

          if (tokenset === key) {
            // if tokenset is the same as the upper key, we will get
            // { key: key: {} }, so copy the object and move it a layer deeper
            const copy = _obj[key];
            delete _obj[key];
            _obj[key] = {};
            /** @type {Obj} */ (_obj[key])[key] = copy;
          } else {
            /** @type {Obj} */ (_obj[tokenset])[key] = nestedObj;
            delete _obj[key];
          }
        }
      });
    }
  });
  return _obj;
}
