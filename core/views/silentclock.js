exports.AppointToday = async (event, JSONDateValues) => {
  const webContents = event.sender;
    if (JSONDateValues) {
      const sqlite3 = require('sqlite3').verbose();
      const todayDateValue = JSON.parse(JSONDateValues);
      console.log(todayDateValue);
      const db = new sqlite3.Database('mydatabase.db');
      const query = `SELECT * FROM users WHERE appointmentDate = '${todayDateValue}' ORDER BY appointmentDate DESC`;
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
      });
    }
  };
  
