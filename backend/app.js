import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import authRoutes from './routes/auth.routes.js'; // Rutas para autenticacion
import userRoutes from './routes/user.routes.js'; // Rutas para panel administrador usuarios


dotenv.config();

const app =  express();

//--- Middlewares ---//
app.use(cors());
app.use(express.json());
//-------------------//

//------- Rutas ------//
app.use('/', authRoutes);
app.use('/', userRoutes);
//-------------------//

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

