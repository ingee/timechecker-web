$(function() {

  var putConsole = function(msg) {
    $('#console').text(msg);
  }
    
  var callApi = function(url, msg) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
    }).done(function(res) {
      putConsole(msg + JSON.stringify(res));
    }).fail(function() {
      putConsole('something wrong!');
    });
  };

  $('#execBtn').on('click', function() {
    callApi('exec', 'execBtn clicked!=> ');
    console.log('execBtn clicked');
  });

  $('#doneBtn').on('click', function() {
    callApi('done', 'doneBtn clicked!=> ');
    console.log('doneBtn clicked');
  });

  console.log("ready!");

});
