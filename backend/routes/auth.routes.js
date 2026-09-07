import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = Router();

//----------- GET -----------//
//---------------------------//

//---------- POST -----------//
router.post('/login', loginUser) // Ruta para iniciar sesion 
router.post('/register', registerUser); // Ruta para registrar un usuario
//---------------------------//

//---------- PUT ------------//
//---------------------------//

//---------- DELETE ---------//
//---------------------------//

export default router;