
exports.POSTRegisterForm = async (e,formDataJSON) => {
  e.preventDefault()
  
  const formData = JSON.parse(formDataJSON)
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('mydatabase.db'); // open the database
  console.log(formData)
  db.run('INSERT INTO users (name, lastname, phone, email, appointmentType ,appointmentDate, appointmentTime)  VALUES (?, ?, ?, ?, ?, ?, ?)', [
    formData.name,
    formData.lastname,
    formData.phone,
    formData.email,
    formData.appointmentType,
    formData.appointmentDate,
    formData.appointmentTime
  ], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    
  }
  );
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


    


}





