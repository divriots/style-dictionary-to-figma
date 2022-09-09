---
'@divriots/style-dictionary-to-figma': patch
---

Do proper isObject check (typeof null and Array are also 'object') where needed. Fixes bug with metadata props with type Array getting altered by trimValue to become Objects.
