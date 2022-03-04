# Google sheet content converter
Convert your Google sheet content to JSON file. It helps you to easily convert to nested objects and also to arrays.<br/>
You can use it to manage some text content on Google sheet, and it's easy to output.

## Setting
Enter your `sheet_id` and `api_key` on `package.json` first, and make sure your sheet has `the Viewer access rights enabled`.<br />
You can also change the output `path`.
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
---
## Command line
Start with React to preview the conversion result.
```sh
npm run start
```

Convert sheet content to JSON file.
```sh
npm run convert
```
---
## Example
### Nested Objects.
| A | B | C |
|---|---|---|
| foo | bar |  |
| parent | child_a | Peter |
| parent | child_b | Tom |


```sh
// output:
{
  "foo": "bar",
  "parent": {
    "child_a": "Peter",
    "child_b": "Tom"
  }
}
```

### Array.
Use `#` to mark the index of the array.
| A | B | C | D |
|---|---|---|---|
| store | fruit#0 | apple |  |
| store | fruit#1 | banana |  |
| store | food#0 | name | hot dog |
| store | food#0 | price | 10 |
| store | food#1 | name | soda |
| store | food#1 | price | 5 |

```sh
// output:
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
    "id": (sheet_id),
    "key": (googleapi key),
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