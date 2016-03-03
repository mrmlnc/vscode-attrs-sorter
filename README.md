# Sorting HTML and Jade attributes

> Sorting of the tag attributes in the specified order.

## HTML

![2016-03-03_16-23-34](https://cloud.githubusercontent.com/assets/7034281/13495536/5f4bf152-e15c-11e5-8031-62ca1a5709f2.gif)


## Jade

![2016-03-03_16-23-51](https://cloud.githubusercontent.com/assets/7034281/13495537/5f4fb1b6-e15c-11e5-8f55-fc8e2d60053c.gif)

## Install

To install, press `F1` and select `Extensions: Install Extensions` and then search for and select `attrs-sorter`.

## Usage

Press `F1` and run the command named `attrs-sorter`.

## Keyboard shortcuts

For changes keyboard shortcuts, create a new rule in `File -> Preferences -> Keyboard Shortcuts`:

```json
{
  "key": "ctrl+shift+c",
  "command": "attrsSorter.processEditor"
}
```

## Supported settings

 * `attrsSorter.order` {Array} — An array of attributes in the correct order.

For example:

```json
{
  "attrsSorter.order": ["data", "aria", "class"]
}
```

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/vscode-attrs-sorter/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
