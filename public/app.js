$(function() {

  var putConsole = function(data) {
    $('#consoleDiv')
      .prepend('<span class="' + data.api+'">' 
                + JSON.stringify(data) + '</span><br/>');
  }
    
  var callApi = function(url, data) {
    $.ajax({
      url: url,
      type: 'GET',
      data: data,
      dataType: 'json',
    });
  };

  var socket = io();
  socket.on('api-fired', function(data) {
    putConsole(data);
    console.log('api-fired', data);
  });

  $('#cmdLine').keypress(function(e) {
    if (e.keyCode === 13) {
      callApi('exec', { cmd: $('#cmdLine').val() });
      console.log('ENTER pressed');
    }
  });
      
  $('#execBtn').click(function() {
    callApi('exec', { cmd: $('#cmdLine').val() });
    console.log('execBtn clicked');
  });

  $('#doneBtn').click(function() {
    callApi('done');
    console.log('doneBtn clicked');
  });

  $('#clearBtn').click(function() {
    $('#consoleDiv').text('');
    console.log('clearBtn clicked');
  });

  console.log('ready!');

});
