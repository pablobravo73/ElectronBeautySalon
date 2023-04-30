const { app, BrowserWindow, ipcMain, webContents } = require('electron')
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


//mainWindow.webContents.send("algoPasa", pruebaMain)


app.whenReady().then(() => {
  CreateDataBase()
  // const result = searchAppointments()
  ipcMain.handle('setFormData', POSTRegisterForm) // handle the event from the renderer process
  ipcMain.handle('search-appointments', searchAppointments)

  // handle the event from the renderer process

 
  
  

 
  
  // ipcMain.handle('search-appointments', (event, searchValues) => {
  //   if (searchValues) {
  //     const sqlite3 = require('sqlite3').verbose();
  //     const SearchValues = JSON.parse(searchValues);
  //     const db = new sqlite3.Database('mydatabase.db');
  //     const query = `SELECT * FROM users WHERE ${SearchValues.category} LIKE ? ORDER BY appointmentDate DESC`;
  //     const searchValue = `%${SearchValues.keyword}%`;
  //     console.log(query, searchValue); 
  //     db.all(query, [searchValue], (err, rows) => {
  //       if (err) {
  //         console.error(err.message);
  //         event.sender.send('search-appointments-reply', []);
  //         mainWindow.webContents.send("algoPasa", pruebaMain)
  //       } else {
  //         console.log(rows);
  //         webContents.send('search-appointments-reply', rows);
          
            
          
          

          
  //       }
  //     });
  //   }  
  // });
  
 

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