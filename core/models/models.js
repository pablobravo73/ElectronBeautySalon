

exports.CreateDataBase = () => {
const sqlite3 = require('sqlite3').verbose();

//Creamos una instancia de la base de datos
const db = new sqlite3.Database('mydatabase.db'); 
db.run(` 
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    lastname TEXT,
    phone INTEGER,
    email TEXT,
    appointmentType TEXT,
    appointmentDate DATE,
    appointmentTime TIME
    )`)
}