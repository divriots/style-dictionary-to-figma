---
'@divriots/style-dictionary-to-figma': minor
---

BREAKING: do not restore original value if it was not a reference value. Before, it used to always restore, which unintentionally also restored style-dictionary transforms. For nested values, restore fully if any reference is found inside the nested value (object or array). If undesired, you can always use `ignoreUseRefValue` (see [README](./README.md)) to fall back to keeping the fully resolved value. Currently, a hybrid solution that restores only the subparts of a value that is partially using references, is not available. Feel free to raise an issue if needed to explain your use case.
