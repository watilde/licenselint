var fs = require('fs');
var path = require('path');
var readJson = require('read-package-json');

module.exports = function (dirname, node_modules, cb) {
  dirname = dirname || __dirname;
  node_modules = node_modules
    || path.join(dirname, 'node_modules');

  if (!node_modules) return;

  var dir = fs.readdirSync(node_modules)
  dir.forEach(function (name) {
    if (name === '.bin') return;

    var pkg = path.join(node_modules, name, 'package.json');
    readJson(pkg, console.error, false, function (er, data) {
      if (er) {
        console.error("There was an error reading the file")
        return
      }

      cb({
        name: data.name,
        license: data.license
      });
    });
  });
}
