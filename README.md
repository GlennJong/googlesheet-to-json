# Google sheet content converter
Convert Google sheet content to JSON file. Easily convert to nested objects and also to arrays.<br />
It helps manage some text content on Google sheet, and it's easy to output.

## Setting
Enter `sheet_id` and `api_key` on `package.json` first, and make sure the sheet has `the Viewer access rights enabled`.<br />
You can also change the output `path`.
```sh
// package.json
  ...
  "converter": {
    "sheet_id": (sheet_id),
    "api_key": (googleapi key),
    "path": "public/json/"
  }
  ...
```
---
## Command line
Convert sheet content to JSON file.
```sh
npm run convert
```
Start with React to preview the result of conversion.
```sh
npm run start
```
---
## Example
### Nested Objects
|   | A | B | C |
|---|---|---|---|
| 1 | foo | bar |  |
| 2 | parent | child_a | Peter |
| 3 | parent | child_b | Tom |

output:
```json
{
  "foo": "bar",
  "parent": {
    "child_a": "Peter",
    "child_b": "Tom"
  }
}
```

### Arrays
Use `#` to mark the index of the array.
|   | A | B | C | D |
|---|---|---|---|---|
| 1 | store | fruit#0 | apple |  |
| 2 | store | fruit#1 | banana |  |
| 3 | store | food#0 | name | hot dog |
| 4 | store | food#0 | price | 10 |
| 5 | store | food#1 | name | soda |
| 6 | store | food#1 | price | 5 |

output:
```json
{
  "store": {
    "fruit": [
      "apple",
      "banana"
    ],
    "food": [
      {
        "name": "hot dog",
        "price": "10"
        },
      {
        "name": "soda",
        "price": "5"
      }
    ]
  }
}
```
---
## Settings
```sh
// package.json
  "scripts": {
    ...
    "convert": "node jsonConverter.js"
  },
  ...
  "converter": {
    "sheet_id": (sheet_id),
    "api_key": (googleapi key),
    "path": "public/json/"
  }
  ...
```

## Dependence
```sh
  "devDependencies": {
    "node-fetch": "^2.6.1"
  }
```