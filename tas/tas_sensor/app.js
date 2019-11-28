/**
 * Created by ryeubi on 2015-08-31.
 * Updated 2017.03.06
 * Made compatible with Thyme v1.7.2
 */

var net = require("net");
var util = require("util");
var fs = require("fs");
var xml2js = require("xml2js");
var axios = require("axios");

var wdt = require("./wdt");

var useparentport = "";
var useparenthostname = "";

var upload_arr = [];
var download_arr = [];

var conf = {};

// This is an async file read
fs.readFile("conf.xml", "utf-8", function(err, data) {
  if (err) {
    console.log("FATAL An error occurred trying to read in the file: " + err);
    console.log("error : set to default for configuration");
  } else {
    var parser = new xml2js.Parser({ explicitArray: false });
    parser.parseString(data, function(err, result) {
      if (err) {
        console.log(
          "Parsing An error occurred trying to read in the file: " + err,
        );
        console.log("error : set to default for configuration");
      } else {
        var jsonString = JSON.stringify(result);
        conf = JSON.parse(jsonString)["m2m:conf"];

        useparenthostname = conf.tas.parenthostname;
        useparentport = conf.tas.parentport;

        if (conf.upload != null) {
          if (conf.upload["ctname"] != null) {
            upload_arr[0] = conf.upload;
          } else {
            upload_arr = conf.upload;
          }
        }

        if (conf.download != null) {
          if (conf.download["ctname"] != null) {
            download_arr[0] = conf.download;
          } else {
            download_arr = conf.download;
          }
        }
      }
    });
  }
});

var tas_state = "init";

var upload_client = null;

function sensor_upload_action() {
  axios
    .get("http://115.68.37.90/api/logs/latest", {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIxM2M3YzhmMzYwMDAzNGExZDVhNDkzZWI5NWVkZGY4MDIwMzI4YzU4ZGM1ODMxY2JhYWI5YTU1ZTE2YTA4YTk5YWUyNzVmYmVlM2NlYTc2In0.eyJhdWQiOiIxIiwianRpIjoiYjEzYzdjOGYzNjAwMDM0YTFkNWE0OTNlYjk1ZWRkZjgwMjAzMjhjNThkYzU4MzFjYmFhYjlhNTVlMTZhMDhhOTlhZTI3NWZiZWUzY2VhNzYiLCJpYXQiOjE1NzI0Mjc0NTAsIm5iZiI6MTU3MjQyNzQ1MCwiZXhwIjoxNTg4MjM4NjUwLCJzdWIiOiIxMDAwMDAwMDAwMSIsInNjb3BlcyI6W119.IQj7AjsyRpX9Y8jJI2HJJOL221m95YRbbbX_VpvH-Nfb2NjF6w1E43qbv7tzLJqOPlsz0OkzmEDbp0405FMMan8K8Z1NdBhjaRPFDAdCaosudMUZXsovOP0buJWtoR-pcaG5MQ46wVbjBeSBJFqMzDgSrFQyjf_71Tk0MH4JLVPQVyVuTKdh_a3AWYi0BOAf6Mu31erd7i0ArkOSXeRvGnsh64qWHMuoLThy83wN7D2eTnKqHeOAbhXIJhRYWJrLI0pEzsQTy1-TC0oftKntAVVJIFx2HTOyHnCacgA2MVv8SKDu_Y6ZAoFkDv9t0KjsB7ZQKesoGUA5VHDOVdyQvtivCaNBJRLqF6r6DJhM8qP4AyDooZ5x9kfBV607MeKGm6dSFx-2EBKyqB9HSyjEBq-kD5S_iJ4Vw7MGHsh8qHjivUNXMYXcY70jktfk-OMeQ4EZz1J5WMur1jsU4rTaVFipWaF7l4-Q4kfsnBS4nMt6Gq3mCFgjEkgF0QfhpPYiNEUcpmUqG61wfgl1TQ6q2OPvYtpsxVff89TLvXriV0CfBePlw6rfr3hg8wZnkH0P7BirGA6RfTHDlXOG6432528pgZeowYpJtQBmey1iP7P1aQGmIeeeWrI2RbM8Eat_oQMoT0RShx66lmKlg8zxaXsDDSWcfdYlRC53s_0RfNE",
      },
    })
    .then(function(res) {
      var final = res.data.result.filter(function(obj) {
        return obj.DEVICE_SCODE == "DGU0004";
      });

      var content = final.map(function(obj) {
        return {
          time: obj.DEVICE_DATA_REG_DTM,
          temperature: obj.DEVICE_FIELD01,
          humidity: obj.DEVICE_FIELD02,
          illumination: obj.DEVICE_FIELD03,
          moved: obj.DEVICE_FIELD04,
          lastmovetime: obj.DEVICE_FIELD05,
          co2: obj.DEVICE_FIELD10,
          tvoc: obj.DEVICE_FIELD11,
        };
      });
      if (tas_state == "upload") {
        var con = content[0];
        for (var i = 0; i < upload_arr.length; i++) {
          if (upload_arr[i].id == "sensor") {
            var cin = { ctname: upload_arr[i].ctname, con: con };
            console.log(JSON.stringify(cin) + " ---->");
            upload_client.write(JSON.stringify(cin) + "<EOF>");
            break;
          }
        }
      }
    })
    .catch(function(error) {
      console.error(error);
    });
}

var tas_download_count = 0;

function on_receive(data) {
  if (
    tas_state == "connect" ||
    tas_state == "reconnect" ||
    tas_state == "upload"
  ) {
    var data_arr = data.toString().split("<EOF>");
    if (data_arr.length >= 2) {
      for (var i = 0; i < data_arr.length - 1; i++) {
        var line = data_arr[i];
        var sink_str = util.format("%s", line.toString());
        var sink_obj = JSON.parse(sink_str);

        if (sink_obj.ctname == null || sink_obj.con == null) {
          console.log("Received: data format mismatch");
        } else {
          if (sink_obj.con == "hello") {
            console.log("Received: " + line);

            if (++tas_download_count >= download_arr.length) {
              tas_state = "upload";
            }
          } else {
            for (var j = 0; j < upload_arr.length; j++) {
              if (upload_arr[j].ctname == sink_obj.ctname) {
                console.log("ACK : " + line + " <----");
                break;
              }
            }
          }
        }
      }
    }
  }
}

function tas_watchdog() {
  if (tas_state == "init") {
    upload_client = new net.Socket();

    upload_client.on("data", on_receive);

    upload_client.on("error", function(err) {
      console.log(err);
      tas_state = "reconnect";
    });

    upload_client.on("close", function() {
      console.log("Connection closed");
      upload_client.destroy();
      tas_state = "reconnect";
    });

    if (upload_client) {
      console.log("tas init ok");
      tas_state = "connect";
    }
  } else if (tas_state == "connect" || tas_state == "reconnect") {
    upload_client.connect(useparentport, useparenthostname, function() {
      console.log("upload Connected");
      tas_download_count = 0;
      for (var i = 0; i < download_arr.length; i++) {
        console.log(
          "download Connected - " + download_arr[i].ctname + " hello",
        );
        var cin = { ctname: download_arr[i].ctname, con: "hello" };
        upload_client.write(JSON.stringify(cin) + "<EOF>");
      }

      if (tas_download_count >= download_arr.length) {
        tas_state = "upload";
      }
    });
  }
}

wdt.set_wdt(require("shortid").generate(), 9, sensor_upload_action);
wdt.set_wdt(require("shortid").generate(), 3, tas_watchdog);
