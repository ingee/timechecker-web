var express = require('express');
var app = express();

//
// utility functions
//

var bgnTime;
var sendResponse = function(res, time, result) {
  var resObj = { time: time, result: result };
  res.end(JSON.stringify(resObj));
  console.log(resObj);
}

var exec = require('child_process').exec;
var execCmd = function(cmd) {
  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    if (error !== null) {
      console.log('error= ' + error);
    }
  });
}

//
// API handlers
//

app.get('/exec', function(req, res) {
  bgnTime = process.hrtime();
  sendResponse(res, bgnTime, 'OK');
  execCmd('ls -al');
});

app.get('/done', function(req, res) {
  endTime = process.hrtime();
  if (!bgnTime) {
    var endTime = process.hrtime();
    sendResponse(res, endTime, 'call EXEC first');
  } else {
    var diff = process.hrtime(bgnTime);
    var endTime = process.hrtime();
    sendResponse(res, endTime, JSON.stringify(diff));
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
