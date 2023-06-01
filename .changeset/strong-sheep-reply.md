---
'@divriots/style-dictionary-to-figma': patch
---

Restore original reference value in objects/arrays for only those items that were originally references. This will keep any other non-reference pretransformed items as intended - previously other transforms were reverted.
