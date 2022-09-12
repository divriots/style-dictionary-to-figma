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

> The tool, at the moment, assumes usage of the Sync feature of Figma Tokens Plugin.
> The JSON output is catered to this as it is a single file containing the tokensets information.

## Features

- **Mandatory action required**: Supports marking a category as a custom tokenset so that it will appear as a separate tokenset in Figma. This is useful if you want to combine many base tokens into a "global" set for example and a mandatory step for Figma Tokens Plugin currently, or your references will not work. You can configure it like so:

  ```json
  {
    "color": {
      "tokenset": "global",
      "primary": {
        "base": {
          "type": "color",
          "value": "#14b8a6"
        }
      }
    }
  }
  ```

  `color.primary.base` token will appear under `global` tokenset now in the plugin.

- Trims `.value` from reference values as Figma Tokens plugin does not use this suffix.
- Trims the `name` properties from tokens since Figma Tokens plugin uses this property to name its tokens, however, without a name property it creates its own naming/nesting by the object structure which is way nicer.
- Use the reference values rather than its resolved values. Put `ignoreUseRefValue: true` as a sibling property to the value prop if you want to make an exception and keep it as a resolved value.
- Allow passing some optional options to adjust the object conversion:

  - cleanMeta, if `true`, will clean up some of the meta info that style-dictionary creates, which Figma Tokens plugin doesn't care about. Can also pass a `string[]` if you want to configure a blacklist of meta props that you want to filter out yourself

  ```js
  transform(obj, { cleanMeta: ['foo', 'bar'] });
  ```

## Usage

```sh
npm i @divriots/style-dictionary-to-figma
```

```js
import { transform } from '@divriots/style-dictionary-to-figma';

const sdObject = { ... };
const figmaObj = transform(sdObject);
```

In case you want its separate counterparts, you can import them separately.

```js
import {
  trimValue,
  trimName,
  useRefValue,
  markTokenset,
  cleanMeta,
} from '@divriots/style-dictionary-to-figma';
```

Once you transformed the object to Figma, a recommendation is to push this to GitHub and use the [Figma Tokens plugin](https://www.figma.com/community/plugin/843461159747178978) to sync with it to use the tokens in Figma.

## Use in [Backlight](https://backlight.dev/) / [Style-dictionary](https://amzn.github.io/style-dictionary/#/)

Import the `transform` utility and create a style-dictionary formatter:

```js
const { transform } = require('@divriots/style-dictionary-to-figma');
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerFormat({
  name: 'figmaTokensPlugin',
  formatter: ({ dictionary }) => {
    const transformedTokens = transform(dictionary.tokens);
    return JSON.stringify(transformedTokens, null, 2);
  },
});
```

Or you can also put the formatter directly into the config without registering it imperatively:

```js
const { transform } = require('@divriots/style-dictionary-to-figma');

module.exports = {
  source: ['**/*.tokens.json'],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = transform(dictionary.tokens);
      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  platforms: {
    json: {
      transformGroup: 'js',
      buildPath: '/tokens/',
      files: [
        {
          destination: 'tokens.json',
          format: 'figmaTokensPlugin',
        },
      ],
    },
  },
};
```

This spits out a file `/tokens/tokens.json` which Figma Tokens plugin can import (e.g. through GitHub).

Since [Backlight](https://backlight.dev/) has [GitHub](https://github.com/) and [Style-Dictionary](https://amzn.github.io/style-dictionary/#/) integration out of the box, this process is very simple.

## Create a JSON for each tokenset

Perhaps you'd like to use this tool to generate a separate JSON file for each tokenset,
which you can then manually paste into the Figma Tokens Plugin JSON view.
For example, when you're not using the Figma Tokens Plugin Sync feature.

For this, [refer to this code snippet from this issue](https://github.com/divriots/style-dictionary-to-figma/issues/15#issuecomment-1127797022).
