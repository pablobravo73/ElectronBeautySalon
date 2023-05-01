const { app, BrowserWindow, ipcMain, webContents } = require('electron')
const path = require('path')
const util = require('util');
const sqlite3 = require('sqlite3').verbose();
const { CreateDataBase } = require('./core/models/models.js')
const { POSTRegisterForm} = require('./core/views/CRUD.js')
const { searchAppointments } = require('./core/views/search.js')
const { AppointToday } = require('./core/views/sideNextDate.js')
const moment = require('moment');
//const { checkAppointments } = require('./core/backend/silentClock.js') 






// Convierte la función Database.all en una función que devuelve una promesa
const allAsync = util.promisify(sqlite3.Database.prototype.all);

// función para verificar si hay una cita programada para la hora actual o siguiente
async function checkAppointments() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDay = now.getDay(); // o cualquier método para obtener el día actual

  // abre la conexión a la base de datos
  const db = new sqlite3.Database('mydatabase.db');

  try {
    // consulta la base de datos para obtener las citas programadas a partir de la hora actual
    const rows = await allAsync.call(db, `SELECT * FROM users WHERE appointmentDate = ? AND appointmentTime >= ?`, [now.toISOString().slice(0, 10), `${currentHour}:${currentMinute}`]);

    // ordena las citas por hora y minutos
    rows.sort((a, b) => {
      const aTime = a.appointmentTime.split(':');
      const bTime = b.appointmentTime.split(':');
      if (aTime[0] === bTime[0]) {
        return aTime[1] - bTime[1];
      }
      return aTime[0] - bTime[0];
    });

    // verifica si hay una cita programada
    if (rows.length > 0) {
      // establece el tiempo de espera hasta la cita más próxima
      const nextAppointmentTime = rows[0].appointmentTime.split(':');
      let waitTime = (+nextAppointmentTime[0] - currentHour) * 60 * 60 * 1000;
      waitTime += (+nextAppointmentTime[1] - currentMinute) * 60 * 1000;
      if (waitTime < 0) {
        waitTime = 0;
      }

      // muestra una alerta cuando sea el momento de la cita
      setTimeout(async () => {
        try {
          await dialog.showMessageBox({
            type: 'info',
            title: 'Cita',
            message: 'Tiene una cita programada en este momento.',
            buttons: ['Ok']
          });
          // vuelve a llamar a la función de verificación de citas
          await checkAppointments();
        } catch (err) {
          console.error(err);
        }
      }, waitTime);
    }
  } catch (err) {
    console.error(err);
  } finally {
    // cierra la conexión a la base de datos
    db.close();
  }
}

// llama a la función de verificación de citas para iniciar el proceso
setInterval(checkAppointments, 5 * 60 * 1000);




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
  CreateDataBase();
  checkAppointments();
  ipcMain.handle('setFormData', POSTRegisterForm) // handle the event from the renderer process
  ipcMain.handle('search-appointments', searchAppointments)
  ipcMain.handle('today-appoints', AppointToday)

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