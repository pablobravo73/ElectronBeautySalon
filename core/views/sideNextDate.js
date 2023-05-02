exports.AppointToday = async (event, JSONDateValues) => {
  const webContents = event.sender;
  if (JSONDateValues) {
    const sqlite3 = require('sqlite3').verbose();
    const todayDateValue = JSON.parse(JSONDateValues);
    const path = require('path');
    const dbPath = path.join(__dirname, '../../database/mydatabase.db');
    const db = new sqlite3.Database(dbPath);
    const query = `SELECT * FROM users WHERE appointmentDate LIKE '${todayDateValue}' ORDER BY  appointmentTime AND appointmentDate ASC`;
    console.log(query); 
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        event.sender.send('today-appoints-reply', []);
      } else {
        console.log(rows);
        const Rows = JSON.stringify(rows)
        event.sender.send('today-appoints-reply', Rows);
      }
      // Close the database connection after the search operation is finished
      db.close();
    });
  }
};
