# @divriots/style-dictionary-to-figma

## 0.4.0

### Minor Changes

- ab01a1e: BREAKING: if an upper token group does not have a tokenset property, it will get placed in a "global" tokenset by default. This means that no action is required by the user of the transformer to get a working JSON for Figma Tokens Plugin, but this change is potentially breaking because of how it changes the JSON output.

  ### Before

  ```json
  {
    "core": {
      "color": {
        "primary": {
          "base": {
            "type": "color",
            "value": "#14b8a6"
          },
          "secondary": {
            "type": "color",
            "value": "#ff0000"
          }
        }
      }
    }
  }
  ```

  Nothing is changed in the output. However, if you have references, they might be broken because the plugin will interpret this as `"color"` being the upper property in a tokenset called `"core"`.

  ### After

  ```json
  {
    "core": {
      "color": {
        "primary": {
          "base": {
            "type": "color",
            "value": "#14b8a6"
          },
          "secondary": {
            "type": "color",
            "value": "#ff0000"
          }
        }
      }
    }
  }
  ```

  turns into

  ```json
  {
    "global": {
      "core": {
        "color": {
          "primary": {
            "base": {
              "type": "color",
              "value": "#14b8a6"
            },
            "secondary": {
              "type": "color",
              "value": "#ff0000"
            }
          }
        }
      }
    }
  }
  ```

  Your reference, for example `{core.color.primary.base}` will now work properly because `"core"` is not interpreted as the tokenset, `"global"` is.

### Patch Changes

- ab01a1e: Fix clean-meta utility by using a proper isObject check which excludes arrays (values can be arrays).

## 0.3.3

### Patch Changes

- 2c9be59: Allow tokensets to be the same name as the upper most keys in the tokens object, e.g.:

  ```json
  {
    "core": {
      "tokenset": "core",
      "color": {
        "value": "#ff0000",
        "type": "color"
      }
    }
  }
  ```

  will become

  ```json
  {
    "core": {
      "core": {
        "color": {
          "value": "#ff0000",
          "type": "color"
        }
      }
    }
  }
  ```

  so that Figma Tokens plugin picks it up properly.

## 0.3.2

### Patch Changes

- f9cf466: Allow passing an options object, for example `cleanMeta`, to clean unwanted meta props from the style-dictionary object.

## 0.3.1

### Patch Changes

- 1c0ee01: Do proper isObject check (typeof null and Array are also 'object') where needed. Fixes bug with metadata props with type Array getting altered by trimValue to become Objects.

## 0.3.0

### Minor Changes

- b6cb742: BREAKING: do not restore original value if it was not a reference value. Before, it used to always restore, which unintentionally also restored style-dictionary transforms. For nested values, restore fully if any reference is found inside the nested value (object or array). If undesired, you can always use `ignoreUseRefValue` (see [README](./README.md)) to fall back to keeping the fully resolved value. Currently, a hybrid solution that restores only the subparts of a value that is partially using references, is not available. Feel free to raise an issue if needed to explain your use case.

## 0.2.1

### Patch Changes

- c30d4c1: Allow passing ignoreUseRefValue boolean metadata as a sibling to the token value property. It will use the resolved value rather than using the original reference value after conversion when this is set to true.

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
