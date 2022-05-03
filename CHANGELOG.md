# @divriots/style-dictionary-to-figma

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
