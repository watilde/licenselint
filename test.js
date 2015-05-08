var licenselint = require("./lib")
var fixture = JSON.stringify([
  {
    "name": "commander",
    "license": "MIT",
    "version": "2.8.1"
  },
  {
    "name": "read-package-json",
    "license": "ISC",
    "version": "1.3.3"
  }
], 2, 2)


licenselint(process.cwd(), {version: true}, function (data) {
  if (fixture !== JSON.stringify(data, 2, 2)) throw new Error("Error")
})
