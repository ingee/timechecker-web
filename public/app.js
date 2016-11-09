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

  $('#cmdText').keypress(function(e) {
    if (e.keyCode === 13) {
      callApi('exec', { cmd: $('#cmdText').val() });
      console.log('ENTER pressed');
    }
  });
      
  $('#execBtn').click(function() {
    callApi('exec', { cmd: $('#cmdText').val() });
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

  console.log("ready!");

});
