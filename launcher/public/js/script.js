const ipc = require('electron').ipcRenderer;

const launchGame = () => {
  // ipc.send('login', {
  //   username: 'username',
  //   password: 'password',
  //   auto_connect: true,
  // });
  ipc.send('connect');
};

//ipc.send('connect');

ipc.on('link', function (event, url) {
  console.log('received link');
  console.log(event, url);
});
