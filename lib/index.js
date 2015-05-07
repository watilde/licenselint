var fs = require("fs")
var path = require("path")
var readJson = require("read-package-json")

module.exports = function (dirname, opts, cb) {
  if (typeof cb !== "function") {
    cb = opts
  }

  var node_modules = path.join(dirname, "node_modules")

  try {
    var dir = fs.readdirSync(node_modules)
  } catch (e) {
    throw new Error(e)
  }

  var bin = dir.indexOf(".bin")
  if (bin !== -1) dir.splice(bin, 1)
  var i = 0
  var data = []
  dir.forEach(function (name) {
    var pkg = path.join(node_modules, name, "package.json")
    readJson(pkg, console.error, false, function (er, pkg) {
      i += 1
      if (er) {
        throw new Error("There was an error reading the file")
      }

      var name = pkg.name
      var license = pkg.license || pkg.licenses
      if (typeof license === "object") license = license.type
      if (license == null) license = null

      var obj = {
        name: name,
        license: license
      }

      if (opts.version) obj.version = pkg.version

      data.push(obj)

      if (i === dir.length - 1) cb(data)
    })
  })
}
