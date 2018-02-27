import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const {ipcMain} = require('electron');
const dialog = require('electron').dialog;

// opening music files
ipcMain.on('openFileRequest', function(event, data) {
  dialog.showOpenDialog({
    title: "Select Music...",
    filters: [
      {name: 'mp3 files', extensions: ['mp3']}
    ]
  }, function(filename){
    console.log(filename);
    if(filename === undefined){
      console.log("NO the sun is a deadly laser");
    }else{
      console.log("Not anymore there's a blanket");
    }
  });
});
