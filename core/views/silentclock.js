exports.searchAppointments = async (event, searchValues) => {
    const webContents = event.sender;
      if (searchValues) {
        const sqlite3 = require('sqlite3').verbose();
        const SearchValues = JSON.parse(searchValues);
        const db = new sqlite3.Database('mydatabase.db');
        const query = `SELECT * FROM users WHERE ${SearchValues.category} LIKE ? ORDER BY appointmentDate DESC LIMIT 1`;
        const searchValue = `%${SearchValues.keyword}%`;
        console.log(query, searchValue); 
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

exports.cockSearch = async (event, searchValues) => {

    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('mydatabase.db');

    
};

      // Consultar la base de datos para obtener la cita más próxima
  db.get('SELECT * FROM users WHERE appointmentDate AND appointmentTime ORDER BY appointment_time LIMIT 1', (err, row) => {
    if (err) {
      console.log(err.message);
    }
   

    if (row) {
      // Obtener la hora actual y la hora de la cita
      const now = new Date();
      const apptTime = new Date(row.appointment_time);

      // Si la hora actual es igual a la hora de la cita, mostrar la alerta
      if (now.getTime() === apptTime.getTime()) {
        const notification = {
          title: 'Recordatorio de cita',
          body: `Tiene una cita con ${row.name} en ${row.appointment_time}`,
        };

        new Notification(notification).show();
      }
    }
  });

  db.close();
};
