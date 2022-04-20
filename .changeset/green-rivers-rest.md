---
'@divriots/style-dictionary-to-figma': minor
---

BREAKING: no longer using default export, this is considered an anti-pattern for JS libraries. [Re-export wildstars with default exports in ESM](https://twitter.com/DasSurma/status/1509835337295609865) is one example quirk, another example is [CommonJS not supporting default exports next to named exports in a single file](https://github.com/divriots/style-dictionary-to-figma/issues/7). Now, the main export is a named export called "transform" and you have to import it as such.

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
