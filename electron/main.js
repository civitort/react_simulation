
const { BrowserWindow, app} = require("electron");
const path = require("path");

let mainWindow;

const createWindow = () => {
 mainWindow = new BrowserWindow({
  width: 1600,
  height: 900,
  webPreferences: {
   preload: path.resolve(__dirname, "preload.js"),
  },
 });

 mainWindow.loadFile("build/index.html");
};

app.whenReady().then(createWindow);

app.once('window-all-closed', () => app.quit());
