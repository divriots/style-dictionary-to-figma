import { markTokenset } from './mark-tokenset.js';
import { trimName } from './trim-name.js';
import { trimValue } from './trim-value.js';
import { useRefValue } from './use-ref-value.js';

/**
 * @typedef {Record<string, unknown>} Obj
 */

/**
 * @param {Obj} obj
 * @returns {Obj}
 */
export default function styleDictionaryToFigma(obj) {
  return markTokenset(trimName(useRefValue(trimValue(obj))));
}
