import { expect } from '@esm-bundle/chai';
import { markTokenset } from '../src/mark-tokenset.js';

describe('mark-tokenset', () => {
  it('allows marking object with a tokenset metadata prop, moving the object into this upper category', () => {
    const obj = {
      nested: {
        tokenset: 'global',
        doubleNested: {
          tripleNested: {
            type: 'color',
            value: '{colors.accent.base.value}',
          },
        },
      },
    };

    const expectedObj = {
      global: {
        nested: {
          doubleNested: {
            tripleNested: {
              type: 'color',
              value: '{colors.accent.base.value}',
            },
          },
        },
      },
    };

    const marked = markTokenset(obj);
    expect(marked).to.eql(expectedObj);
  });

  it("ignores tokenset metadata if it's used on the wrong level", () => {
    const obj = {
      tokenset: 'global',
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
      tokenset: 'global',
      nested: {
        doubleNested: {
          tripleNested: {
            type: 'color',
            value: '{colors.accent.base.value}',
          },
        },
      },
    };

    const obj2 = {
      nested: {
        doubleNested: {
          tripleNested: {
            tokenset: 'global',
            type: 'color',
            value: '{colors.accent.base.value}',
          },
        },
      },
    };

    const expectedObj2 = {
      nested: {
        doubleNested: {
          tripleNested: {
            tokenset: 'global',
            type: 'color',
            value: '{colors.accent.base.value}',
          },
        },
      },
    };

    const marked = markTokenset(obj);
    expect(marked).to.eql(expectedObj);
    const marked2 = markTokenset(obj2);
    expect(marked2).to.eql(expectedObj2);
  });

  it('merges multiple marked sets with the same value into one tokenset', () => {
    const obj = {
      nested: {
        tokenset: 'global',
        doubleNested: {
          tripleNested: {
            type: 'color',
            value: '{colors.accent.base.value}',
          },
        },
      },
      foo: {
        tokenset: 'global',
        bar: {
          type: 'color',
          value: '{colors.accent.light.value}',
        },
      },
    };

    const expectedObj = {
      global: {
        nested: {
          doubleNested: {
            tripleNested: {
              type: 'color',
              value: '{colors.accent.base.value}',
            },
          },
        },
        foo: {
          bar: {
            type: 'color',
            value: '{colors.accent.light.value}',
          },
        },
      },
    };

    const marked = markTokenset(obj);
    expect(marked).to.eql(expectedObj);
  });
});
