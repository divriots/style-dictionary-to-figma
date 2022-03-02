<p align="center">
  <img style="width: 200px; margin-bottom: 20px" alt="style dictionary playground logo" src="https://raw.githubusercontent.com/divriots/style-dictionary-to-figma/main/.github/logo.png">
</p>
<p align="center">
  <a href="https://divRIOTS.com">Brought to you by<br/></a>
  <a href="https://divRIOTS.com#gh-light-mode-only">
    <img width="150" height="40" src="https://divRIOTS.com/divriots.svg" alt="‹div›RIOTS" />
  </a>
  <a href="https://divRIOTS.com#gh-dark-mode-only">
    <img width="150" height="40" src="https://divRIOTS.com/divriots-dark.svg" alt="‹div›RIOTS" />
  </a>
</p>

# Style Dictionary To Figma


A utility that transforms a [style-dictionary](https://amzn.github.io/style-dictionary/#/) object into something [Figma Tokens plugin](https://www.figma.com/community/plugin/843461159747178978) understands.

Used by Design Systems in [Backlight](https://backlight.dev) using design tokens in [style-dictionary](https://amzn.github.io/style-dictionary/) that can be synced into Figma via the [Figma Tokens plugin](https://www.figma.com/community/plugin/843461159747178978).

## Features

- Allows marking a category as a custom tokenset so that it will appear as a separate tokenset in Figma. This is useful if you want to combine many base tokens into a "global" set for example.
- Trims `.value` from reference values as Figma Tokens plugin does not use this suffix.
- Trims the `name` properties from tokens since Figma Tokens plugin uses this property to name its tokens, however, without a name property it creates its own naming/nesting by the object structure which is way nicer.
- Use the reference values rather than its resolved values

## Usage

```sh
npm i @divriots/style-dictionary-to-figma
```

```js
import styleDictionaryToFigma from '@divriots/style-dictionary-to-figma';

const sdObject = { ... };
const figmaObj = styleDictionaryToFigma(sdObject);
```

In case you want its separate counterparts, you can import them separately.

```js
import {
  trimValue,
  trimName,
  useRefValue,
  markTokenset,
} from '@divriots/style-dictionary-to-figma';
```

Once you transformed the object to Figma, a recommendation is to push this to GitHub and use the [Figma Tokens plugin](https://www.figma.com/community/plugin/843461159747178978) to sync with it to use the tokens in Figma.

## Use in [Backlight](https://backlight.dev/) / [Style-dictionary](https://amzn.github.io/style-dictionary/#/)

Simply import the `styleDictionaryToFigma` utility and create a style-dictionary formatter:

```js
import styleDictionaryToFigma from '@divriots/style-dictionary-to-figma';

export default {
  source: ['**/*.tokens.json'],
  format: {
    figmaTokensPluginJson: opts => {
      const { dictionary } = opts;
      const parsedTokens = styleDictionaryToFigma(dictionary.tokens);
      return JSON.stringify(parsedTokens, null, 2);
    },
  },
  platforms: {
    json: {
      transformGroup: 'js',
      buildPath: '/tokens/',
      files: [
        {
          destination: 'tokens.json',
          format: 'figmaTokensPluginJson',
        },
      ],
    },
  },
};
```

This spits out a file `/tokens/tokens.json` which Figma Tokens plugin can import (e.g. through GitHub).

Since [Backlight](https://backlight.dev/) has [GitHub](https://github.com/) and [Style-Dictionary](https://amzn.github.io/style-dictionary/#/) integration out of the box, this process is very simple.
