$(function() {

  var putConsole = function(msg) {
    $('#consoleDiv').prepend(msg + '<br/>');
  }
    
  var callApi = function(url, data) {
    $.ajax({
      url: url,
      type: 'GET',
      data: data,
      dataType: 'json',
    }).done(function(res) {
      putConsole(JSON.stringify(res));
    }).fail(function() {
      putConsole('something wrong!');
    });
  };

  $('#execBtn').on('click', function() {
    callApi('exec', { cmd: $('#cmdText').val() });
    console.log('execBtn clicked');
  });

  $('#doneBtn').on('click', function() {
    callApi('done');
    console.log('doneBtn clicked');
  });

  $('#clearBtn').on('click', function() {
    $('#consoleDiv').text('');
    console.log('clearBtn clicked');
  });

  console.log("ready!");

});
