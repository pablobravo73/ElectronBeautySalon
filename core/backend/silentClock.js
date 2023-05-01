const { setTimeout } = require('timers');
const sqlite3 = require('sqlite3').verbose();

// función para verificar si hay una cita programada para la hora actual o siguiente
exports.checkAppointments = async () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDay = now.getDay(); // o cualquier método para obtener el día actual

  // abre la conexión a la base de datos
  const db = new sqlite3.Database('mydatabase.db');

  // consulta la base de datos para obtener las citas programadas a partir de la hora actual
  db.all(`SELECT * FROM users WHERE appointmentDate = ? AND appointmentTime >= ?`, [now.toISOString().slice(0, 10), `${currentHour}:${currentMinute}`], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }

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
      setTimeout(() => {
        const { dialog } = require('electron');
        dialog.showMessageBox({
          type: 'info',
          title: 'Cita',
          message: 'Tiene una cita programada en este momento.',
          buttons: ['Ok']
        });
        // vuelve a llamar a la función de verificación de citas
        exports.checkAppointments();
      }, waitTime);
    }
  });

  // cierra la conexión a la base de datos
  db.close();
};

// llama a la función de verificación de citas para iniciar el proceso
exports.checkAppointments();
