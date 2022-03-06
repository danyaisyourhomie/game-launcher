const { app, BrowserWindow, ipcMain } = require('electron');

const jwt = require('jsonwebtoken');
// Module with utilities for working with file and directory paths.
const path = require('path');
// Module with utilities for URL resolution and parsing.
const url = require('url');

const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Deep linked url
let deeplinkingUrl;

// Force Single Instance Application
const gotTheLock = app.requestSingleInstanceLock();
if (gotTheLock) {
  app.on('second-instance', (e, argv) => {
    // Someone tried to run a second instance, we should focus our window.

    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform == 'win32') {
      // Keep only command line / deep linked arguments
      deeplinkingUrl = argv.slice(1);
    }
    logTool('app.makeSingleInstance# ' + deeplinkingUrl);

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
} else {
  app.quit();
  return;
}

function handleWebSync(
  data = 'TOKEN===eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImtsYWRuaXRza3kiLCJza2luVXJsIjpudWxsLCJpYXQiOjE2NDY1NjA5MTB9.htI9ErCIlLaKCXVLxRYKx4X1BC2mLPBaQt3bkB9hbLQ'
) {
  console.log(1);
  const token = data.replace(/\//g, '').split('===')[1];

  logTool(token, ' <- received token');

  const user = jwt.verify(token, 'LAUNCHER');
  console.log(user);

  logTool(user.nickname, ' <- received nickname');

  const userProfile = {
    access_token: user.accessToken,
    client_token: user.accessToken,
    uuid: user.uuid,
    name: user.nickname,
    user_properties: JSON.stringify({}),
  };

  mainWindow.webContents.send('status', 'Запускаем игру...');

  launchGame(userProfile);
}

function launchGame(user) {
  logTool('launched game');

  console.log(user);

  let opts = {
    clientPackage: null,
    authorization: user,
    auto_connect: true,
    root: 'bin/minecraft',
    os: 'windows',

    version: {
      number: '1.18.1',
      type: 'release',
    },
    memory: {
      max: '1500',
      min: '512',
    },

    host: 'mbtl.ru',
  };

  console.log(opts);
  launcher.launch(opts);

  launcher.on('debug', (e) => logTool(e));
  launcher.on('close', () => closeGame());
  launcher.on('data', (e) => mainWindow.webContents.send(e));
}

function closeGame() {
  mainWindow.show();
  mainWindow.webContents.send('status', 'Готово к запуску через mbtl.ru');
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'public/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Protocol handler for win32
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deeplinkingUrl = process.argv.slice(1);
  }

  handleWebSync();

  // const userProfile = {
  //   access_token: 'test',
  //   client_token: 'test',
  //   uuid: 'test',
  //   name: 'test',
  //   user_properties: JSON.stringify({}),
  // };

  // launchGame(userProfile);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.removeAsDefaultProtocolClient('megalauncher');

if (!app.isDefaultProtocolClient('megalauncher')) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient('megalauncher');
}

app.on('will-finish-launching', function () {
  // Protocol handler for osx
  app.on('open-url', function (event, url) {
    event.preventDefault();
    deeplinkingUrl = url;

    handleWebSync(deeplinkingUrl);
  });
});

function logTool(data, prefix = '') {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log("${data}")`);
  }

  mainWindow.webContents.send('status', data.toString());

  console.log(data);
}
