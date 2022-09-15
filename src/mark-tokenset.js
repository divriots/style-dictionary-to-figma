import { isObject } from './utils/isObject.js';

/**
 * @typedef {import('./style-dictionary-to-figma.js').Obj} Obj
 * @typedef {import('./options').Options} opts
 */

/**
 * @param {Obj} obj
 * @param {opts} [opts]
 * @returns {Obj}
 */
export function markTokenset(obj, opts) {
  const defaultTokenset = opts?.defaultTokenset;
  const _obj = { ...obj };
  Object.keys(_obj).forEach(key => {
    if (isObject(_obj[key])) {
      const nestedObj = /** @type {Obj} */ (_obj[key]);
      // If not marked by a tokenset, put it in a "global" set
      // so at least references do work by default in Figma Tokens plugin
      if (!nestedObj.tokenset && defaultTokenset !== false) {
        const set = typeof defaultTokenset === 'string' ? defaultTokenset : 'global';
        nestedObj.tokenset = set;
      }
      // check so we know it's an object
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
