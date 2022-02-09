import { expect } from '@esm-bundle/chai';
import { trimName } from '../src/trim-name.js';

describe('trim-name', () => {
  it('trims away any name prop', () => {
    const obj = {
      value: '{color.accent.base.value}',
      name: 'ColorsAccentBaseName',
    };

    const expectedObj = {
      value: '{color.accent.base.value}',
    };

    const trimmedObj = trimName(obj);
    expect(trimmedObj).to.eql(expectedObj);
  });

  it('trims away any name prop in nested objects', () => {
    const obj = {
      nested: {
        doubleNested: {
          tripleNested: {
            type: 'color',
            value: '{color.accent.base.value}',
            name: 'ColorsAccentBaseName',
          },
        },
      },
    };

    const expectedObj = {
      nested: {
        doubleNested: {
          tripleNested: {
            type: 'color',
            value: '{color.accent.base.value}',
          },
        },
      },
    };

    const trimmedObj = trimName(obj);

    expect(trimmedObj).to.eql(expectedObj);
  });
});
