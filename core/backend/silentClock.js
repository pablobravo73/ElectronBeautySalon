// función para verificar si hay una cita programada para la hora actual o siguiente
async function checkAppointments() {

  const moment = require("moment");
  const sqlite3 = require('sqlite3').verbose();
  const util = require('util');
  const { dialog, BrowserWindow } = require('electron');

  const now = moment().unix();
  const currentDay = moment().day(); // o cualquier método para obtener el día actual

  // abre la conexión a la base de datos
  const db = new sqlite3.Database('mydatabase.db');
  const allAsync = util.promisify(sqlite3.Database.prototype.all);

  try {
    // consulta la base de datos para obtener las citas programadas a partir de la hora actual
    const rows = await allAsync.call(db, `SELECT *, strftime('%s', appointmentTime, 'localtime') AS appointmentTimeUnix FROM users WHERE appointmentDate = ? AND appointmentTime >= time('now', 'localtime')`, [moment().format('YYYY-MM-DD')]);

    // ordena las citas por hora y minutos
    rows.sort((a, b) => {
      const aTimeUnix = moment.unix(a.appointmentTimeUnix).unix();
      const bTimeUnix = moment.unix(b.appointmentTimeUnix).unix();
      return aTimeUnix - bTimeUnix;
    });

    // verifica si hay una cita programada
    if (rows.length > 0) {
      // establece el tiempo de espera hasta la cita más próxima
      const nextAppointmentTime = moment.unix(rows[0].appointmentTimeUnix).unix();
      let waitTime = (nextAppointmentTime - now) //* 1000; 
      if (waitTime < 0) {
        waitTime = 0;
      }

      // muestra una alerta cuando sea el momento de la cita
      let alertBox;
      const mainWindow = BrowserWindow.getAllWindows()[0];

      setTimeout(async () => {
        try {
          alertBox = await dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Cita',
            message: `Tiene una cita programada en este momento.`,
            //buttons: ['Ok']
          });
          // vuelve a llamar a la función de verificación de citas
          await checkAppointments();
        } catch (err) {
          console.error(err);
        }
      }, waitTime);

      // cierra la alerta al cerrar la ventana principal
      mainWindow.on('closed', () => {
        if (alertBox) {
          alertBox.response = 0;
        }
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    // cierra la conexión a la base de datos
    db.close();
  }
}

// Exporta la función checkAppointments
module.exports = { checkAppointments };
