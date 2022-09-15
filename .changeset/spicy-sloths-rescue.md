---
'@divriots/style-dictionary-to-figma': minor
---

BREAKING: if an upper token group does not have a tokenset property, it will get placed in a "global" tokenset by default. This means that no action is required by the user of the transformer to get a working JSON for Figma Tokens Plugin, but this change is potentially breaking because of how it changes the JSON output.

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
