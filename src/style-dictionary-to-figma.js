import { markTokenset } from './mark-tokenset.js';
import { trimName } from './trim-name.js';
import { trimValue } from './trim-value.js';
import { useRefValue } from './use-ref-value.js';
import { cleanMeta } from './clean-meta.js';

/**
 * @typedef {Record<string, unknown>} Obj
 * @typedef {import('./options').Options} opts
 */

/**
 * @param {Obj} obj
 * @param {opts} [opts]
 * @returns {Obj}
 */
export function transform(obj, opts) {
  return cleanMeta(markTokenset(trimName(useRefValue(trimValue(obj)))), opts);
}
