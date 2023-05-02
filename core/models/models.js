exports.CreateDataBase = () => {
  const sqlite3 = require('sqlite3').verbose();
  const fs = require('fs');
  const path = require('path');

  const dbPath = path.join(__dirname, '../../database/mydatabase.db');
  console.log(dbPath);

  // Creamos una instancia de la base de datos
  const db = new sqlite3.Database(dbPath);
  db.run(` 
     CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT,
       lastname TEXT,
       phone INTEGER,
       email TEXT,
       appointmentType TEXT,
       appointmentDate DATE,
       appointmentTime TIME,
       attendance INTEGER
     )`)
}

