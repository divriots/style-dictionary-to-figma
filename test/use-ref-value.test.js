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

  it('does not replace value with original value if original value is not a reference', () => {
    const obj = {
      original: {
        value: 'Medium',
      },
      value: '500',
    };
    const expectedObj = {
      original: {
        value: 'Medium',
      },
      value: '500',
    };
    const transformedObj = useRefValue(obj);
    expect(transformedObj).to.eql(expectedObj);
  });

  it('does not replace value with original value if original value do not contain references', () => {
    const obj = {
      original: {
        value: {
          lineHeight: 1,
          fontWeight: '500',
        },
      },
      value: {
        lineHeight: 1,
        fontWeight: 'Medium',
      },
    };
    const expectedObj = {
      original: {
        value: {
          lineHeight: 1,
          fontWeight: '500',
        },
      },
      value: {
        lineHeight: 1,
        fontWeight: 'Medium',
      },
    };
    const transformedObj = useRefValue(obj);
    expect(transformedObj).to.eql(expectedObj);

    const obj2 = {
      original: {
        value: ['{shadow.core.4}', 'pre-transformed-shadow-2'],
      },
      value: ['0 0 4px rgba(0,0,0,0.6)', '0 0 2px rgba(0,0,0,0.6)'],
    };
    const expectedObj2 = {
      original: {
        value: ['{shadow.core.4}', 'pre-transformed-shadow-2'],
      },
      value: ['{shadow.core.4}', 'pre-transformed-shadow-2'],
    };
    const transformedObj2 = useRefValue(obj2);
    expect(transformedObj2).to.eql(expectedObj2);
  });

  it('replaces value with original value if original value contains references', () => {
    const obj = {
      original: {
        value: {
          fontFamily: '{fontFamily.body}',
          fontWeight: '{fontWeight.regular}',
          lineHeight: '{size.lineHeight.xsmall}',
          fontSize: '{size.font.xsmall}',
        },
      },
      value: {
        fontFamily: 'Inter',
        fontWeight: 'Medium',
        lineHeight: '1',
        fontSize: '16px',
      },
    };
    const expectedObj = {
      original: {
        value: {
          fontFamily: '{fontFamily.body}',
          fontWeight: '{fontWeight.regular}',
          lineHeight: '{size.lineHeight.xsmall}',
          fontSize: '{size.font.xsmall}',
        },
      },
      value: {
        fontFamily: '{fontFamily.body}',
        fontWeight: '{fontWeight.regular}',
        lineHeight: '{size.lineHeight.xsmall}',
        fontSize: '{size.font.xsmall}',
      },
    };
    const transformedObj = useRefValue(obj);
    expect(transformedObj).to.eql(expectedObj);

    const obj2 = {
      original: {
        value: ['{shadow.core.4}', '{shadow.core.2}'],
      },
      value: ['0 0 4px rgba(0,0,0,0.6)', '0 0 2px rgba(0,0,0,0.6)'],
    };
    const expectedObj2 = {
      original: {
        value: ['{shadow.core.4}', '{shadow.core.2}'],
      },
      value: ['{shadow.core.4}', '{shadow.core.2}'],
    };
    const transformedObj2 = useRefValue(obj2);
    expect(transformedObj2).to.eql(expectedObj2);
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
