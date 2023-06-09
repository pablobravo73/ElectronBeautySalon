const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();

// Creamos una instancia de la base de datos
const db = new sqlite3.Database('mydatabase.db');
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lastname TEXT)'); 



function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    
  mainWindow.loadFile('index.html')

  // ipcMain.on('set-title', (event, title) => {
  //   console.log(title)
  //  })
  
  ipcMain.on('set-title', (event, formValues) => {
    console.log(formValues)

    db.run('INSERT INTO users (name, lastname) VALUES (?, ?)', [formValues.name, formValues.lastname], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  //   //console.log(fname, lname)
  //   db.run('INSERT INTO users (name, lastname) VALUES (?, ?)', [fname, lname], function(err) {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //     // get the last insert id
  //     console.log(`A row has been inserted with rowid ${this.lastID}`);
  //   });
    //console.log(fname, lname)
  //   db.run('INSERT INTO users (name, lastname) VALUES (?, ?)', [fname, lname], function(err) {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //     // get the last insert id
  //     console.log(`A row has been inserted with rowid ${this.lastID}`);
  //   });
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})