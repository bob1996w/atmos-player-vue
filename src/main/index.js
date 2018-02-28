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
const path = require('path');


// opening music files
ipcMain.on('openFileRequest', async (event, data) => {
  function getMetaData(filename){
    var musicData = {};
    var fs = require('fs');
    var mm = require('musicmetadata'); 
    mm(fs.createReadStream(filename), (err, metadata) => {
      if (err) throw err;
      musicData['meta'] = JSON.parse(JSON.stringify(metadata));
      if (musicData.meta.title == ""){
        musicData.meta.title = path.basename(filename);
      }
      musicData['path'] = filename;
      event.sender.send('get-musics', musicData);
    });
  };
  var filenames = dialog.showOpenDialog({
    title: "Select Music...",
    properties: [
      'multiSelections'
    ],
    filters: [
      {name: 'supported music files', extensions: ['mp3', 'flac']}
    ]
  })
  if(filenames === undefined){
    console.log("Nothing selected");
  }else{
    for(var i = 0 ; i < filenames.length; i++) {
      getMetaData(filenames[i]);
    }
  }
});