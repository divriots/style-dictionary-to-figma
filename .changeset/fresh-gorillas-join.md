---
'@divriots/style-dictionary-to-figma': patch
---

Allow tokensets to be the same name as the upper most keys in the tokens object, e.g.:

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