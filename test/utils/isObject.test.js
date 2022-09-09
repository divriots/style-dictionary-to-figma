import { expect } from '@esm-bundle/chai';
import { isObject } from '../../src/utils/isObject.js';

describe('isObject utility', () => {
  it('detects if something is an object', () => {
    expect(isObject({})).to.be.true;
    expect(isObject({ foo: 'bar', qux: { test: '1', testTwo: '2' } })).to.be.true;
    expect(isObject(['foo', { test: '1', testTwo: '2' }])).to.be.false;
    expect(isObject(null)).to.be.false;
  });
});
