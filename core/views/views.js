//POST
// exports.POSTRegisterForm = async (dataForm) => {
  
//   const sqlite3 = require('sqlite3').verbose();
//   const db = new sqlite3.Database('mydatabase.db'); // open the database
//   console.log(dataForm)
//   db.run('INSERT INTO users (name, lastname, phone, email, appointmentType ,appointmentDate, appointmentTime)  VALUES (?, ?, ?, ?, ?, ?, ?)', [
//     dataForm.name,
//     dataForm.lastname,
//     dataForm.phone,
//     dataForm.email,
//     dataForm.service,
//     dataForm.date,
//     dataForm.time
//   ], function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
//     // get the last insert id
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
//     console.log(data.email)
//   });
// };
exports.POSTRegisterForm = async (e,dataForm) => {
  console.log(dataForm)


}





