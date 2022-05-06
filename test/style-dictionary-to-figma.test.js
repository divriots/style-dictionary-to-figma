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
      boxShadow: {
        small: {
          value: [
            {
              x: '0',
              y: '1',
              blur: '2',
              spread: '0',
              color: '{color.accent.base.value}',
              type: 'dropShadow',
            },
            {
              x: '0',
              y: '2',
              blur: '4',
              spread: '0',
              color: '{color.accent.base.value}',
              type: 'dropShadow',
            },
          ],
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
      boxShadow: {
        small: {
          value: [
            {
              x: '0',
              y: '1',
              blur: '2',
              spread: '0',
              color: '{color.accent.base}',
              type: 'dropShadow',
            },
            {
              x: '0',
              y: '2',
              blur: '4',
              spread: '0',
              color: '{color.accent.base}',
              type: 'dropShadow',
            },
          ],
        },
      },
    };

    const transformedObj = transform(obj);
    expect(transformedObj).to.eql(expectedObj);
  });
});
