import { expect } from '@esm-bundle/chai';
import { trimValue } from '../src/trim-value.js';

describe('trim-value', () => {
  it('trims away any .value from reference values', () => {
    const obj = {
      value: '{colors.accent.base.value}',
    };

    const expectedObj = {
      value: '{colors.accent.base}',
    };

    const trimmedObj = trimValue(obj);
    expect(trimmedObj).to.eql(expectedObj);
  });

  it('does not trim away .value if it is not inside a reference value', () => {
    const obj = {
      value: 'colors.accent.base.value',
    };

    const expectedObj = {
      value: 'colors.accent.base.value',
    };

    const trimmedObj = trimValue(obj);
    expect(trimmedObj).to.eql(expectedObj);
  });

  it('trims away any .value from reference values in nested objects', () => {
    const obj = {
      nested: {
        doubleNested: {
          tripleNested: {
            type: 'color',
            value: '{colors.accent.base.value}',
          },
        },
      },
    };

    const expectedObj = {
      nested: {
        doubleNested: {
          tripleNested: {
            type: 'color',
            value: '{colors.accent.base}',
          },
        },
      },
    };

    const trimmedObj = trimValue(obj);

    expect(trimmedObj).to.eql(expectedObj);
  });
});
