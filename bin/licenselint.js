#!/usr/bin/env node

var program = require("commander")
var pkg = require("../package.json")
var licenselint = require("../lib")

program
  .version(pkg.version)

licenselint(process.cwd(), function (data) {
  console.log(JSON.stringify(data, 2, 2))
})
