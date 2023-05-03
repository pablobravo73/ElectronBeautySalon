const sqlite3 = require('sqlite3').verbose();
const { app, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Obtener la ruta de la carpeta de datos de la aplicación
const userDataPath = app.getPath('userData');
const databaseFolder = path.join(userDataPath, 'database');
const dbPath = path.join(databaseFolder, 'mydatabase.db');

// Imprimir la ruta de la carpeta de datos
console.log(`La carpeta de datos esta en: ${userDataPath}`);

// Verificar si la carpeta de base de datos existe
if (!fs.existsSync(databaseFolder)) {
  // Si la carpeta no existe, crearla
  fs.mkdirSync(databaseFolder);
}

// Verificar si el archivo de base de datos existe
const dbExists = fs.existsSync(dbPath);

// Abrir la conexión a la base de datos
const db = new sqlite3.Database(dbPath);

exports.CreateDataBase = () => {
  if (!fs.existsSync(dbPath)) {
    // Si el archivo de base de datos no existe, crear la tabla de usuarios
    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastname TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      appointmentType TEXT NOT NULL,
      appointmentDate TEXT NOT NULL,
      appointmentTime TEXT NOT NULL,
      attendance INTEGER NOT NULL
    )`);
  }
};

exports.POSTRegisterForm = async (e, formDataJSON) => {
  e.preventDefault();

  const formData = JSON.parse(formDataJSON);

  try {
    await db.run(
      'INSERT INTO users (name, lastname, phone, email, appointmentType, appointmentDate, appointmentTime, attendance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        formData.name,
        formData.lastname,
        formData.phone,
        formData.email,
        formData.appointmentType,
        formData.appointmentDate,
        formData.appointmentTime,
        0,
      ],
      function(err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
  }

  // No cerrar la conexión a la base de datos aquí para que siga abierta y se pueda acceder a los datos guardados
};
exports.searchAppointments = async (event, searchValues) => {
  
  const webContents = event.sender;
  if (searchValues) {
    const SearchValues = JSON.parse(searchValues);
    const query = `SELECT *, strftime('%s', appointmentDate || ' ' || appointmentTime) AS appointmentTimeUnix FROM users WHERE ${SearchValues.category} LIKE ? ORDER BY appointmentTimeUnix ASC`;
    const searchValue = `%${SearchValues.keyword}%`;
 
    db.all(query, [searchValue], (err, rows) => {
      if (err) {
        console.error(err.message);
        event.sender.send('search-appointments-reply', []);
      } else {
        console.log(rows);
        const Rows = JSON.stringify(rows)
        event.sender.send('search-appointments-reply', Rows);
      }
    });
  }
};




exports.checkAppointments = async ()=> {

  try {
    // Obtener la cita más cercana
    const now = Math.floor(Date.now() / 1000); // tiempo actual en Unix
    const sql = `SELECT * FROM users WHERE appointmentTime - ${now} <= 60 AND attendance = 0 ORDER BY appointmentTime ASC LIMIT 1`;
    const appointment = await new Promise((resolve, reject) => {
      db.get(sql, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    


    // Si se encontró una cita cercana, esperar hasta la hora de la cita para emitir una alerta
    if (appointment) {
      const appointmentTime = Math.floor(new Date(appointment.appointmentDate + ' ' + appointment.appointmentTime).getTime() / 1000); // tiempo de la cita en Unix
      const timeToAppointment = appointmentTime - now; // diferencia en segundos entre la hora actual y la hora de la cita
      
      setTimeout(() => {
        const message = `La cita para ${appointment.name} ${appointment.lastname} está programada para el ${appointment.appointmentDate} a las ${appointment.appointmentTime}.\n¡Es hora de su cita!`;

        dialog.showMessageBox({
          type: 'info',
          title: 'Cita programada',
          message,
          buttons: ['OK']
        });

        // Aquí puedes agregar cualquier lógica para enviar una alerta por correo electrónico, SMS, etc.
        // ...

        // Marcar la cita como atendida en la base de datos
        const updateSql = `UPDATE users SET attendance = 1 WHERE id = ${appointment.id}`;
        db.run(updateSql, [], function(err) {
          if (err) console.error(err);
          else {
            console.log(`La cita para ${appointment.name} ${appointment.lastname} ha sido marcada como atendida.`);

            // Pasar a la siguiente cita
            exports.checkAppointments();
          }
        });
      }, timeToAppointment * 1000); // convertir la diferencia de segundos a milisegundos para setTimeout()

    } else {
      // No hay citas cercanas, cerrar la conexión a la base de datos
    }
  } catch (error) {
    console.error(error);
  }
}
 //llamar a la función para iniciar la recursión después de la primera cita programada




exports.AppointToday = async (event, JSONDateValues) => {
  const webContents = event.sender;
  if (JSONDateValues) {
    const todayDateValue = JSON.parse(JSONDateValues);
    const query = `SELECT * FROM users WHERE appointmentDate = '${todayDateValue}' ORDER BY  appointmentTime ASC`;
     
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        event.sender.send('today-appoints-reply', []);
      } else {
        
        const Rows = JSON.stringify(rows)
        event.sender.send('today-appoints-reply', Rows);
      }
      // Close the database connection after the search operation is finished
      console.log('prueba.');
    });
  }
};
















// const sqlite3 = require('sqlite3').verbose();
// const { app } = require('electron');
// const path = require('path');
// const fs = require('fs');

// // Obtener la ruta de la carpeta de datos de la aplicación
// const userDataPath = app.getPath('userData');
// const dbPath = path.join(userDataPath, 'mydatabase.db');

// // Verificar si el archivo de base de datos existe
// const dbExists = fs.existsSync(dbPath);

// // Abrir la conexión a la base de datos
// const db = new sqlite3.Database(dbPath);

// if (!dbExists) {
//   // Si el archivo de base de datos no existe, crear la tabla de usuarios
//   db.run(`CREATE TABLE users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     lastname TEXT NOT NULL,
//     phone TEXT NOT NULL,
//     email TEXT NOT NULL,
//     appointmentType TEXT NOT NULL,
//     appointmentDate TEXT NOT NULL,
//     appointmentTime TEXT NOT NULL,
//     attendance INTEGER NOT NULL
//   )`);
// }
