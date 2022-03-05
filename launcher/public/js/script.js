const ipc = require('electron').ipcRenderer;

ipc.on('status', function (event, status) {
  $('#info-p').text(status);
});
