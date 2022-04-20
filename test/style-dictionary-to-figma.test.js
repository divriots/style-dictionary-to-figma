import { expect } from '@esm-bundle/chai';
import { transform } from '../src/style-dictionary-to-figma.js';

describe('style-dictionary-to-figma', () => {
  it('transforms style dictionary tokens object to a figma tokens plugin compatible object', () => {
    const obj = {
      button: {
        tokenset: 'foo',
        primary: {
          bg: {
            type: 'color',
            original: {
              value: '{colors.accent.base.value}',
            },
            name: 'ButtonPrimaryBg',
            value: '#F8C307',
          },
        },
      },
    };

    const expectedObj = {
      foo: {
        button: {
          primary: {
            bg: {
              type: 'color',
              original: {
                value: '{colors.accent.base}',
              },
              value: '{colors.accent.base}',
            },
          },
        },
      },
    };

    const transformedObj = transform(obj);
    expect(transformedObj).to.eql(expectedObj);
  });
});
