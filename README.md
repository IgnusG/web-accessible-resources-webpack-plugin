# web-accessible-resources-webpack-plugin

This plugin adds filenames in your webpack to the `web_accessible_resources` clause in your `manifest.json`.
You don't need to maintain a list of images manually anymore.

This is handy when writing chrome extensions, especially when paired with the
[manifest package loader](https://github.com/bronson/manifest-package-loader).

## Install

* `yarn add -D web-accessible-resources-webpack-plugin`

## Usage

```js
// webpack.config.js

const WebAccessibleResourcesPlugin = require('web-accessible-resources-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new WebAccessibleResourcesPlugin(/\.(png|jpg|gif)$/)
  ]
}
```

Now images required by your source files will be mentioned in
[web\_accessible\_resources](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/web_accessible_resources).

For more flexibility, you can specify a function instead of the regular expression:

```js
  new WebAccessibleResourcesPlugin( (name) => ['a.jpg', 'b.jpg'].includes(name) )
```

## Output

Example output in your `manifest.json`:

```js
{
  ...
  "web_accessible_resources": [
    "header.png",
    "landscape.jpg",
    "icon.png"
  ]
}
```

## Contributing

Please file an issue on [GitHub](https://github.com/bronson/web-accessible-resources-webpack-plugin/issues).

## License

MIT, be free.
