/**
 * @typedef {import('./options').Options} Options
 */

/**
 * Recurses object with filter of disallowed props, rest is kept
 *
 * @param {Record<string, unknown>|{}} obj
 * @param {string[]} keys
 * @returns {Record<string, unknown>}
 */
function recursiveCleanMeta(obj, keys) {
  if (obj !== Object(obj)) {
    // nothing to clean
    return obj;
  }

  return Object.keys(obj)
    .filter(k => !keys.includes(k))
    .reduce((acc, x) => Object.assign(acc, { [x]: recursiveCleanMeta(obj[x], keys) }), {});
}

/**
 * Clean unwanted meta props from object, nested.
 *
 * @param {Record<string, unknown>|{}} obj
 * @param {Options} [opts]
 * @returns {Record<string, unknown>}
 */
export function cleanMeta(obj, opts) {
  const cleanMetaOpts = opts?.cleanMeta;
  if (!cleanMetaOpts) {
    return obj;
  }
  /** @type {string[]} */
  let _keys = [];
  if (Array.isArray(cleanMetaOpts)) {
    _keys = cleanMetaOpts;
  } else {
    _keys = ['filePath', 'isSource', 'original', 'attributes', 'path'];
  }

  return recursiveCleanMeta(obj, _keys);
}
