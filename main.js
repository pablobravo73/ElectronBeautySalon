const { app, BrowserWindow, ipcMain, webContents } = require('electron')
const path = require('path')

const { CreateDataBase } = require('./core/models/models.js')
const { POSTRegisterForm} = require('./core/views/CRUD.js')
const { searchAppointments } = require('./core/views/search.js')





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
  ipcMain.handle('setFormData', POSTRegisterForm) // handle the event from the renderer process
  ipcMain.handle('search-appointments', searchAppointments)

  // handle the event from the renderer process

  ipcMain.on('row-value', (_event, value) => { // 
    console.log(value) // will print value to Node console
  })

  createWindow()


  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})