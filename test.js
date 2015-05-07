var licenselint = require("./lib")

licenselint(process.cwd(), {version: true}, function (data) {
  console.log(JSON.stringify(data, 2, 2))
})
