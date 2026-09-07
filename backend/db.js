import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Creamos un pool de conexiones que optimiza las APIs
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificamos la conexion con la base de datos
try {
    const connection = await db.getConnection();
    console.log("Conectado exitosamente con la base de datos de TechShop");
    connection.release();
} catch {
    console.log("Error al intentar conectar con la base de datos", error);
}

export default db;