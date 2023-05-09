const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const util = require('util');
const sqlite3 = require('sqlite3').verbose();
// const { CreateDataBase } = require('./core/models/models.js')
// const { POSTRegisterForm} = require('./core/views/CRUD.js')
// const { searchAppointments } = require('./core/views/search.js')
// const { AppointToday } = require('./core/views/sideNextDate.js')
// const { checkAppointments } = require('./core/backend/silentClock.js');

const { CreateDataBase, 
  POSTRegisterForm, 
  searchAppointments, 
  AppointToday, 
  checkAppointments,
  //DownLoadAppointments
   } = require('./core/models/models.js')

// const { checkAppointments } = require('./core/backend/silentClock.js');

let mainWindow; // Definimos la variable mainWindow como una variable global

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, './UI/img/crown.png'),
    webPreferences: {
      preload: path.join(__dirname, './core/preload.js')
    }
  }
  )
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('./UI/index.html')  
}




app.whenReady()
.then(() => {

  CreateDataBase();
  setInterval(() => {
    checkAppointments();
    console.log('checking appointments');
  }, 60000);

  
  ipcMain.handle('open-appointment-window', () => {
    const modalWindow = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      width: 400,
      height: 700,
      icon: path.join(__dirname, './UI/img/crown.png'),
      webPreferences: {
        contextIsolation: true,
        enableRemoteModule: true,
        preload: path.join(__dirname, './core/preload.js')
      }
    })
    modalWindow.setMenuBarVisibility(false)
    modalWindow.loadFile('./UI/modal.html')
  })
  
  
  ipcMain.handle('setFormData', POSTRegisterForm)
  ipcMain.handle('search-appointments', searchAppointments)
  ipcMain.handle('today-appoints', AppointToday)
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
