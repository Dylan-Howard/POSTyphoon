const { app, BrowserWindow } = require('electron')
var path = require('path');
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}assets/icons/typhoon-sm-rd.png'`
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)
  // win.loadURL('http://localhost:4200')

  //// uncomment below to open the DevTools.

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

// Handles Dev Enviroment Certificate Conflict
app.on('certificate-error', function(event, webContents, url, error,
  certificate, callback) {
      event.preventDefault();
      callback(true);
})