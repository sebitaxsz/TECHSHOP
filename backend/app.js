import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import authRoutes from './routes/auth.routes.js'; // Rutas para autenticacion
import userRoutes from './routes/user.routes.js'; // Rutas para panel administrador usuarios
import productRoutes from './routes/product.routes.js' // Rutas para productos / administrador productos


dotenv.config();

const app =  express();

//--- Middlewares ---//
app.use(cors());
app.use(express.json());
//-------------------//

//------- Rutas ------//
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);
//-------------------//

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

