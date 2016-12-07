var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
io.on('connection', function(socket) {
  console.log('socket connected, OK.');
});


//
// utility functions
//

var bgnTime;
var retCount;
var sendResponse = function(res, api, data) {
  var resObj = { api: api, ret: data };
  res.end();
  io.emit('api-fired', resObj);
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
    sendResponse(res, 'exec', result);
  })
});

app.get('/done', function(req, res) {
  endTime = process.hrtime();
  if (!bgnTime) {
    var endTime = process.hrtime();
    sendResponse(res, 'call EXEC first');
  } else {
    retCount++;
    var endTime = process.hrtime();
    var diff = process.hrtime(bgnTime);
    var diffTime = (diff[0] + diff[1]*1e-9).toFixed(2);
    sendResponse(res, 'done', { count: retCount, diff: diffTime });
  }
});

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//
// start server
//

var port = 8001;
var server = http.listen(port, function() {
  console.log('listening on *:' + port);
});
