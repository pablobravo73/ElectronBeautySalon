const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const { CreateDataBase } = require('./core/models/models.js')
const { POSTRegisterForm, searchAppointments} = require('./core/views/views.js')



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
  //ipcMain.handle('searchAppointments', searchAppointments)
  ipcMain.handle('search-appointments', searchAppointments)

  // ipcMain.handle('search-appointments', (event, searchValues) => {
  //   if (searchValues) {
  //     const sqlite3 = require('sqlite3').verbose();
  //     const SearchValues = JSON.parse(searchValues);
  //     const db = new sqlite3.Database('mydatabase.db');
  //     const query = `SELECT * FROM users WHERE ${SearchValues.category} LIKE ?`;
  //     const searchValue = `%${SearchValues.keyword}%`;
  //     console.log(query, searchValue); 
  //     db.all(query, [searchValue], (err, rows) => {
  //       if (err) {
  //         console.error(err.message);
  //         event.sender.send('search-appointments-reply', []);
  //       } else {
  //         console.log(rows);
  //         event.sender.send('search-appointments-reply', rows);
  //       }
  //     });
  //   }  
  // });
  
  
  

  createWindow()


  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})