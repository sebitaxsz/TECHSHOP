const mysql = require('mysql2');
require('dotenv').config();

// Creamos la conexion usando los datos del archivo .env
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Probar la conexion 
conexion.connect((error) => {
    if (error) {
        console.log("Error al conectar a la base de datos:", error);
        return;
    } else {
        console.log("Conectado exitosamente a la base de datos techshop_db");
    }
});

module.exports = conexion;