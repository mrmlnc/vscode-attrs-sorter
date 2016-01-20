# Sorting HTML attributes

> VS Code plugin for [posthtml-attrs-sorter](https://github.com/mrmlnc/posthtml-attrs-sorter) — sort attribute of the tag based on the given order.

![2016-01-21_01-05-29](https://cloud.githubusercontent.com/assets/7034281/12464661/24955f8c-bfdb-11e5-873d-a04ad0cf6aae.gif)

## Install

To install, press `F1` and select `Extensions: Install Extensions` and then search for and select `attrs-sorter`.

## Usage

Press `F1` and run the command named `attrs-sorter`.

## Supported settings

 * `attrsSorter.order` {Array} — An array of attributes in the correct order.

For example:

```json
{
  "attrsSorter.order": ["data", "aria", "class"]
}
```

## License

This software is released under the terms of the MIT license.
