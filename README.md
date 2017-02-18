# Sorting HTML and Pug/Jade attributes

> Sorting of the tag attributes in the specified order.

## HTML

![2016-03-03_16-23-34](https://cloud.githubusercontent.com/assets/7034281/13495536/5f4bf152-e15c-11e5-8031-62ca1a5709f2.gif)

## Jade

![2016-03-03_16-23-51](https://cloud.githubusercontent.com/assets/7034281/13495537/5f4fb1b6-e15c-11e5-8f55-fc8e2d60053c.gif)

## Donate

If you want to thank me, or promote your Issue.

[![Gratipay User](https://img.shields.io/gratipay/user/mrmlnc.svg?style=flat-square)](https://gratipay.com/~mrmlnc)

> Sorry, but I have work and support for plugins requires some time after work. I will be glad of your support.

## Install

  * Press <kbd>F1</kbd> and `select Extensions: Install Extensions`.
  * Search for and select `attrs-sorter`.

See the [extension installation guide](https://code.visualstudio.com/docs/editor/extension-gallery) for details.

## Usage

  * You can use global keyboard shortcut <kbd>ALT+SHIFT+F</kbd> or right-click context menu `Format code`.
  * Or press <kbd>F1</kbd> and run the command named `Sorting of the tag attributes (attrs-sorter)`.

## Supported languages

  * HTML (+ HTML like languages)
  * Jade (+ Pug)

## Supported settings

**attrsSorter.order**

  * Type: `string[]`
  * Default: http://codeguide.co/#html-attribute-order

An array of attributes in the correct order. See [posthtml-attrs-sorter#order](https://github.com/mrmlnc/posthtml-attrs-sorter#order) for more details.

For example:

```json
{
  "attrsSorter.order": ["data-.+", "aria-.+", "class"]
}
```

## Keyboard shortcuts

For changes keyboard shortcuts, create a new rule in `File -> Preferences -> Keyboard Shortcuts`:

```json
{
  "key": "ctrl+shift+c",
  "command": "attrsSorter.execute"
}
```

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/vscode-attrs-sorter/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
