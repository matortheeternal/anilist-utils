// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app } from 'electron';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.allowRendererProcessReuse = true;

app.on('ready', () => {
  const appUrl = url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true
  });

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    frame: false,
    webPreferences: { nodeIntegration : true }
  });

  if (env.name === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('devtools-opened', function() {
      mainWindow.loadURL(appUrl);
    });
  } else {
    mainWindow.loadURL(appUrl);
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
