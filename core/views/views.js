const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');
const { ipcMain } = require('electron');

exports.POSTRegisterForm = async (e, formDataJSON) => {
  e.preventDefault();
  
  const formData = JSON.parse(formDataJSON);

  try {
    await db.run(
      'INSERT INTO users (name, lastname, phone, email, appointmentType, appointmentDate, appointmentTime) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        formData.name,
        formData.lastname,
        formData.phone,
        formData.email,
        formData.appointmentType,
        formData.appointmentDate,
        formData.appointmentTime,
      ]
    );
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    
    
  } catch (error) {
    console.error(error.message);
  }
};


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
  

// prueba con promesa

// const { ipcRenderer } = require('electron');

// exports.searchAppointments = async (event, searchValues) => {
//   const webContents = event.sender;
//   if (searchValues) {
//     const sqlite3 = require('sqlite3').verbose();
//     const SearchValues = JSON.parse(searchValues);
//     const db = new sqlite3.Database('mydatabase.db');
//     const query = `SELECT * FROM users WHERE ${SearchValues.category} LIKE ?`;
//     const searchValue = `%${SearchValues.keyword}%`;
//     console.log(query, searchValue); 
//     db.all(query, [searchValue], (err, rows) => {
//       if (err) {
//         console.error(err.message);
//         event.sender.send('search-appointments-reply', []);
//       } else {
//         console.log(rows);
//         const promise = new Promise((resolve, reject) => {
//           ipcRenderer.once('search-appointments-reply', (event, rows) => {
//             if (rows) {
//               resolve(rows);
//             } else {
//               reject('No se recibieron resultados');
//             }
//           });
//         });

//         webContents.send('search-appointments', rows);
//         return promise;
//       }
//     });
//   }
// };



// exports.searchAppointments = async (e, SearchValuesJSON) => {
//   e.preventDefault();
//   const Searchvalues = JSON.parse(SearchValuesJSON);
//   console.log(Searchvalues.keyword);
// }


// exports.searchAppointments = async (SearchValuesJSON) => {
//   const Searchvalues = JSON.parse(SearchValuesJSON);

//   const db = new sqlite3.Database('mydatabase.db');
//   const query = `SELECT * FROM users WHERE ${Searchvalues.category} LIKE ?`;
//   const searchValue = `%${Searchvalues.keyword}%`;
//   console.log(query, searchValue);

//   try {
//     const rows = await new Promise((resolve, reject) => {
//       db.all(query, [searchValue], (err, rows) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(rows);
//         }
//       });
//     });

//     db.close();
//     return rows;
//   } catch (error) {
//     console.error(error.message);
//     return [];
//   }
// };

//quien sabe
// async function searchAppointments() {
//   const category = document.getElementById('search-category').value;
//   const keyword = document.getElementById('search-keyword').value;
  
//   const searchResults = document.getElementById('search-results');
//   searchResults.innerHTML = ''; // Vaciar la tabla de resultados

//   const sqlite3 = require('sqlite3').verbose();
//   const db = new sqlite3.Database('mydatabase.db');

//   const query = `SELECT * FROM users WHERE ${category} LIKE '%${keyword}%'`;
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     rows.forEach((row) => {
//       const tr = document.createElement('tr');
//       tr.innerHTML = `
//         <td>${row.name}</td>
//         <td>${row.lastname}</td>
//         <td>${row.phone}</td>
//         <td>${row.email}</td>
//         <td>${row.appointmentType}</td>
//         <td>${row.appointmentDate}</td>
//         <td>${row.appointmentTime}</td>
//       `;
//       searchResults.querySelector('tbody').appendChild(tr);
//     });
//   });
//   db.close();
// }


// };
// //GET
// exports.GETRegisterForm = async (e) => {
//   e.preventDefault()
//   const sqlite3 = require('sqlite3').verbose();
//   const db = new sqlite3.Database('mydatabase.db'); // open the database
//   db.all('SELECT * FROM users', [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     rows.forEach((row) => {
//       console.log(row.name);
//     });
//   });
//   db.close();
// };
// //DELETE
// exports.DELETERegisterForm = async (e) => {
//   e.preventDefault()
//   const sqlite3 = require('sqlite3').verbose();
//   const db = new sqlite3.Database('mydatabase.db'); // open the database
//   db.run('DELETE FROM users WHERE id = 1', function(err) {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log(`Row(s) deleted ${this.changes}`);
//   });
//   db.close();
// };
// //PUT
// exports.PUTRegisterForm = async (e) => {
//   e.preventDefault()
//   const sqlite3 = require('sqlite3').verbose();
//   const db = new sqlite3.Database('mydatabase.db'); // open the database
//   db.run('UPDATE users SET name = ?, lastname = ?, phone = ?, email = ?, appointmentType = ?, appointmentDate = ?, appointmentTime = ? WHERE id = ?', [
//     'Juan',
//     'Perez',
//     '123456789',
//     '',
//     'Corte de pelo',
//     '2021-10-10',
//     '10:00',
//     1
//   ], function(err) {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log(`Row(s) updated: ${this.changes}`);
//   }
//   );
//   db.close();
// };
  








