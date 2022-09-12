import { expect } from '@esm-bundle/chai';
import { cleanMeta } from '../src/clean-meta.js';

describe('clean-meta', () => {
  it('allows cleaning out meta data and only keeping default props: value, type, description', () => {
    const obj = {
      core: {
        color: {
          primary: {
            base: {
              type: 'color',
              value: '#14b8a6',
              original: {
                value: '{palette.red.500}',
              },
              attributes: {
                foo: {
                  bar: { qux: 'boo' },
                },
              },
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
            },
          },
        },
      },
    };

    const marked = cleanMeta(obj, { cleanMeta: true });
    expect(marked).to.eql(expectedObj);
  });

  it('supports passing your own filter of props to keep', () => {
    const obj = {
      core: {
        color: {
          primary: {
            base: {
              type: 'color',
              value: '#14b8a6',
              original: {
                value: '{palette.red.500}',
              },
              attributes: {
                foo: {
                  bar: { qux: 'boo' },
                },
              },
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
              value: '#14b8a6',
              original: {
                value: '{palette.red.500}',
              },
            },
          },
        },
      },
    };

    const marked = cleanMeta(obj, { cleanMeta: ['type', 'path', 'attributes'] });
    expect(marked).to.eql(expectedObj);
  });

  it('keeps everything intact if no filter is passed', () => {
    const obj = {
      core: {
        color: {
          primary: {
            base: {
              type: 'color',
              value: '#14b8a6',
              original: {
                value: '{palette.red.500}',
              },
              attributes: {
                foo: {
                  bar: { qux: 'boo' },
                },
              },
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
              original: {
                value: '{palette.red.500}',
              },
              attributes: {
                foo: {
                  bar: { qux: 'boo' },
                },
              },
              path: ['core', 'color', 'primary', 'base'],
            },
          },
        },
      },
    };

    const marked = cleanMeta(obj);
    expect(marked).to.eql(expectedObj);
    const markedTwo = cleanMeta(obj, {});
    expect(markedTwo).to.eql(expectedObj);
    const markedThree = cleanMeta(obj, { cleanMeta: false });
    expect(markedThree).to.eql(expectedObj);
  });
});
