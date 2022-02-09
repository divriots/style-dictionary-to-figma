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
});
