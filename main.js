const { app, BrowserWindow, ipcMain, webContents } = require('electron')
const path = require('path')
const util = require('util');
const sqlite3 = require('sqlite3').verbose();
const { CreateDataBase } = require('./core/models/models.js')
const { POSTRegisterForm} = require('./core/views/CRUD.js')
const { searchAppointments } = require('./core/views/search.js')
const { AppointToday } = require('./core/views/sideNextDate.js')

const { checkAppointments } = require('./core/backend/silentClock.js');


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
  //setInterval(checkAppointments, 300000, console.log('checking appointments'));
  setInterval(() => {
    checkAppointments();
    console.log('checking appointments');
  }, 60000);
  CreateDataBase();
  
  ipcMain.handle('setFormData', POSTRegisterForm) // handle the event from the renderer process
  ipcMain.handle('search-appointments', searchAppointments)
  ipcMain.handle('today-appoints', AppointToday)

  // handle the event from the renderer process

  ipcMain.on('row-value', (_event, value) => { // 
    
  })

  
  
  

  createWindow()



  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})