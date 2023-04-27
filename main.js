const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const { CreateDataBase } = require('./core/models/models.js')
const { POSTRegisterForm } = require('./core/views/views.js')



function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, './core/preload.js')
    }
  })

  mainWindow.loadFile('./UI/index.html')
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  CreateDataBase()
  
  ipcMain.handle('setFormData', POSTRegisterForm)
  //ipcMain.handle('toMain', POSTRegisterForm)
  

  createWindow()
  //ipcMain.on('toMain',POSTRegisterForm)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})