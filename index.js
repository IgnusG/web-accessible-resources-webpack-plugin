// a plugin that automatically populates manifest.json's web_accessible_resources
// clause with your webpacked images.

function WebAccessibleResourcesPlugin (options) {
  if (options instanceof RegExp) {
    this.matcher = (f) => f.match(options)
  } else if (options instanceof Function) {
    this.matcher = options
  } else {
    throw new Error('matcher must either be a regex or a callback function')
  }
}

WebAccessibleResourcesPlugin.prototype.apply = function (compiler) {
  const matcher = this.matcher
  compiler.hooks.emit.tapAsync('WebAccessibleResourcesPlugin', function (compilation, done) {
    let images = Object.keys(compilation.assets).filter(matcher)
    let manifest = compilation.assets['manifest.json']
    if (manifest) {
      let json = JSON.parse(manifest.source())
      if (!json.web_accessible_resources) json.web_accessible_resources = []
      json.web_accessible_resources.push(...images)
      json.web_accessible_resources.sort()

      const isProduction = (process.argv.indexOf('process.env.NODE_ENV=production') >= 0)
      const indentation = isProduction ? null : 2
      let output = JSON.stringify(json, null, indentation) + '\n'
      manifest.source = () => output
      manifest.size = () => output.length
    } else {
      compilation.errors.push(new Error('you need to add a manifest.json file to your project'))
    }
    done()
  })
}

module.exports = WebAccessibleResourcesPlugin
