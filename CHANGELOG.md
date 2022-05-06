# @divriots/style-dictionary-to-figma

## 0.2.0

### Minor Changes

- 00c39e3: BREAKING: no longer using default export, this is considered an anti-pattern for JS libraries. [Re-export wildstars with default exports in ESM](https://twitter.com/DasSurma/status/1509835337295609865) is one example quirk, another example is [CommonJS not supporting default exports next to named exports in a single file](https://github.com/divriots/style-dictionary-to-figma/issues/7). Now, the main export is a named export called "transform" and you have to import it as such.

  Before:

  ```js
  // ESM
  import styleDictionaryToFigma from '@divriots/style-dictionary-to-figma';
  // CommonJS
  const styleDictionaryToFigma = require('@divriots/style-dictionary-to-figma');

  styleDictionaryToFigma({...}) // figma object
  ```

  After:

  ```js
  // ESM
  import { transform } from '@divriots/style-dictionary-to-figma';
  // CommonJS
  const { transform } = require('@divriots/style-dictionary-to-figma');

  transform({...}) // figma object
  ```

## 0.1.3

### Patch Changes

- ff5d591: Keeps an array-type value as an array. This is useful with boxShadows that can have multiple stacked shadows in a single token.

## 0.1.2

### Patch Changes

- 31493c5: Fixes trimValue when used on values that are objects.

## 0.1.1

### Patch Changes

- 52117f8: Add CommonJS entrypoint, allowing importing with `const sdToFigma = require('@divriots/style-dictionary-to-figma').default`.

## 0.1.0

### Minor Changes

- 092a7fb: Initial release: A utility that transforms a [style-dictionary](https://amzn.github.io/style-dictionary/#/) object into something [Figma Tokens plugin](https://www.figma.com/community/plugin/843461159747178978) understands.
