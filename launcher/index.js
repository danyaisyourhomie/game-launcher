const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const path = require('path');
const url = require('url');
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

const PROTOCOL = 'MBTLLAUNCHER';

let mainWindow;
let deeplinkingUrl;

console.log(__dirname);

async function handleWebSync(url) {
  let profile;
  const token = url.toString().replace(/\//g, '').split('===')[1];
  const user = jwt.verify(token, 'LAUNCHER');

  try {
    const result = await axios(`http://mbtl.ru/api/users/${user.nickname}`);
    profile = result.data;
  } catch (err) {
    mainWindow.webContents.send(
      'status',
      'Произошла ошибка с синхронизацией. Закройте лаунчер и запустите его снова через mbtl.ru'
    );
    console.log(err);
    return;
  }

  let userProfile = {
    name: profile.nickname,
    access_token: profile.accessToken,
    client_token: profile.accessToken,
    uuid: profile.uuid,
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
    root: `${__dirname}/bin/minecraft`,
    os: 'windows',

    version: {
      number: '1.18.1',
      type: 'release',
      custom: 'fabric',
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
  mainWindow.close();
  app.quit();
}

const gotTheLock = app.requestSingleInstanceLock();

if (gotTheLock) {
  app.on('second-instance', (e, argv) => {
    if (process.platform == 'win32') {
      deeplinkingUrl = argv.slice(1);
      handleWebSync(deeplinkingUrl);
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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      autoHideMenuBar: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'public/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  if (process.platform == 'win32') {
    deeplinkingUrl = process.argv.slice(1);
  }

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.removeAsDefaultProtocolClient(PROTOCOL);

if (!app.isDefaultProtocolClient(PROTOCOL)) {
  app.setAsDefaultProtocolClient(PROTOCOL);
}

app.on('will-finish-launching', function () {
  app.on('open-url', function (event, url) {
    event.preventDefault();
    deeplinkingUrl = url;

    handleWebSync(deeplinkingUrl);
  });
});

function logTool(data) {
  console.log(data);
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log("${data}")`);
  }

  mainWindow.webContents.send('status', data.toString());
}
