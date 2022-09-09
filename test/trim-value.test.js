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

  it('trims away any .value from reference values in nested objects when value is object', () => {
    const obj = {
      shadow: {
        value: {
          x: '0',
          y: '1',
          blur: '2',
          spread: '0',
          color: '{color.accent.base.value}',
          type: 'dropShadow',
        },
      },
    };

    const expectedObj = {
      shadow: {
        value: {
          x: '0',
          y: '1',
          blur: '2',
          spread: '0',
          color: '{color.accent.base}',
          type: 'dropShadow',
        },
      },
    };

    const trimmedObj = trimValue(obj);

    expect(trimmedObj).to.eql(expectedObj);
  });

  it('trims away any .value from reference values in nested objects when value is array', () => {
    const obj = {
      shadow: {
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
    };

    const expectedObj = {
      shadow: {
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
    };

    const trimmedObj = trimValue(obj);

    expect(trimmedObj).to.eql(expectedObj);
  });

  it('keeps arbitrary metadata intact', () => {
    const obj = {
      core: {
        color: {
          primary: {
            base: {
              type: 'color',
              value: '#14b8a6',
              path: ['core', 'color', 'primary', 'base'],
            },
          },
        },
      },
    };

    const expectedObj = {
      core: {
        color: {
          primary: {
            base: {
              type: 'color',
              value: '#14b8a6',
              path: ['core', 'color', 'primary', 'base'],
            },
          },
        },
      },
    };

    const transformedObj = trimValue(obj);
    expect(transformedObj).to.eql(expectedObj);
  });
});
