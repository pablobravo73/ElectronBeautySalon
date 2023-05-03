// async function checkAppointments() {
  
//   const fs = require('fs');
//   const sqlite3 = require('sqlite3').verbose();
//   const { dialog } = require('electron');
//   try {
//     // Abrir la conexión a la base de datos
//     const path = require('path');
//     const userDataPath = app.getPath('userData');
//     const dbPath = path.join(userDataPath, 'mydatabase.db');
//     const db = new sqlite3.Database(dbPath);

//     // Obtener la cita más cercana
//     const now = Math.floor(Date.now() / 1000); // tiempo actual en Unix
//     const sql = `SELECT * FROM users WHERE appointmentTime - ${now} <= 60 AND attendance = 0 ORDER BY appointmentTime ASC LIMIT 1`;
//     const appointment = await new Promise((resolve, reject) => {
//       db.get(sql, (err, row) => {
//         if (err) reject(err);
//         else resolve(row);
//       });
//     });

//     // Si se encontró una cita cercana, esperar hasta la hora de la cita para emitir una alerta
//     if (appointment) {
//       const appointmentTime = Math.floor(new Date(appointment.appointmentDate + ' ' + appointment.appointmentTime).getTime() / 1000); // tiempo de la cita en Unix
//       const timeToAppointment = appointmentTime - now; // diferencia en segundos entre la hora actual y la hora de la cita

//       setTimeout(() => {
//         const message = `La cita para ${appointment.name} ${appointment.lastname} está programada para el ${appointment.appointmentDate} a las ${appointment.appointmentTime}.\n¡Es hora de su cita!`;

//         dialog.showMessageBox({
//           type: 'info',
//           title: 'Cita programada',
//           message,
//           buttons: ['OK']
//         });

//         // Aquí puedes agregar cualquier lógica para enviar una alerta por correo electrónico, SMS, etc.
//         // ...

//         // Marcar la cita como atendida en la base de datos
//         const updateSql = `UPDATE users SET attendance = 1 WHERE id = ${appointment.id}`;
//         db.run(updateSql, [], function(err) {
//           if (err) console.error(err);
//           else {
//             console.log(`La cita para ${appointment.name} ${appointment.lastname} ha sido marcada como atendida.`);

//             // Pasar a la siguiente cita
//             checkAppointments();
//           }
//         });
//       }, timeToAppointment * 1000); // convertir la diferencia de segundos a milisegundos para setTimeout()

//     } else {
//       // No hay citas cercanas, cerrar la conexión a la base de datos
//       db.close();
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// module.exports = { checkAppointments };
