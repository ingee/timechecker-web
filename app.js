var express = require('express');
var app = express();

//
// utility functions
//

var bgnTime;
var retCount;
var sendResponse = function(res, time, api, data) {
  var resObj = { time: time, api: api, ret: data };
  res.end(JSON.stringify(resObj));
  console.log(resObj);
}

var exec = require('child_process').exec;
var execCmd = function(cmd, callback) {
  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    var result = { stdout: stdout };
    if (error) {
      console.log('error= ' + error);
      result.error = error.toString();
    }
    callback(result);
  });
}

//
// API handlers
//

app.get('/exec', function(req, res) {
  bgnTime = process.hrtime();
  retCount = 0;
  execCmd(req.query.cmd, function(result) {
    sendResponse(res, bgnTime, '/exec', result);
  })
});

app.get('/done', function(req, res) {
  endTime = process.hrtime();
  if (!bgnTime) {
    var endTime = process.hrtime();
    sendResponse(res, endTime, 'call EXEC first');
  } else {
    retCount++;
    var diff = process.hrtime(bgnTime);
    var endTime = process.hrtime();
    sendResponse(res, endTime, '/done', { count: retCount, diff: diff });
  }
});

app.use(express.static('public'));

//
// start server
//

var port = 8001;
var server = app.listen(port, function() {
  console.log('listening at ' + port + '...');
});
