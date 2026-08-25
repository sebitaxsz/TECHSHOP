const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importamos la conexion a la base de datos
const db = require('./db');

const app = express();

// Middlewares
app.use(cors())
app.use(express.json()) // Permite recibir y enviar datos en formato JSON

// Ruta de pruebas para verificar respuesta por parte del servidor
app.get('/', (req, res) => {
    res.send('API de techshop funcionando correctamente');
});

// Configuramos el servidor al puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 

