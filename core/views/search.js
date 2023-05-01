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