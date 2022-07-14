import { expect } from '@esm-bundle/chai';
import { useRefValue } from '../src/use-ref-value.js';

describe('trim-name', () => {
  it('replaces value with original reference value instead of resolved value', () => {
    const obj = {
      original: {
        value: '{color.accent.base.value}',
      },
      value: '#ffffff',
    };
    const expectedObj = {
      original: {
        value: '{color.accent.base.value}',
      },
      value: '{color.accent.base.value}',
    };
    const transformedObj = useRefValue(obj);
    expect(transformedObj).to.eql(expectedObj);
  });

  // See https://github.com/divriots/style-dictionary-to-figma/issues/17
  // This "feature" is a workaround for https://github.com/six7/figma-tokens/issues/706
  it('it does not use ref value when it encounters ignoreUseRefValue metadata', () => {
    const obj = {
      shadow: {
        2: {
          value: {
            x: '0',
            y: '1',
            blur: '2',
            spread: '0',
            color: '#000000',
            type: 'dropShadow',
          },
        },
        4: {
          value: {
            x: '0',
            y: '2',
            blur: '4',
            spread: '0',
            color: '#000000',
            type: 'dropShadow',
          },
        },
      },
      elevation: {
        small: {
          ignoreUseRefValue: true,
          original: {
            value: ['{shadow.4}', '{shadow.2}'],
          },
          value: [
            {
              x: '0',
              y: '2',
              blur: '4',
              spread: '0',
              color: '#000000',
              type: 'dropShadow',
            },
            {
              x: '0',
              y: '1',
              blur: '2',
              spread: '0',
              color: '#000000',
              type: 'dropShadow',
            },
          ],
        },
      },
    };
    const expectedObj = {
      shadow: {
        2: {
          value: {
            x: '0',
            y: '1',
            blur: '2',
            spread: '0',
            color: '#000000',
            type: 'dropShadow',
          },
        },
        4: {
          value: {
            x: '0',
            y: '2',
            blur: '4',
            spread: '0',
            color: '#000000',
            type: 'dropShadow',
          },
        },
      },
      elevation: {
        small: {
          ignoreUseRefValue: true,
          original: {
            value: ['{shadow.4}', '{shadow.2}'],
          },
          value: [
            {
              x: '0',
              y: '2',
              blur: '4',
              spread: '0',
              color: '#000000',
              type: 'dropShadow',
            },
            {
              x: '0',
              y: '1',
              blur: '2',
              spread: '0',
              color: '#000000',
              type: 'dropShadow',
            },
          ],
        },
      },
    };
    const transformedObj = useRefValue(obj);
    expect(transformedObj).to.eql(expectedObj);
  });
});
