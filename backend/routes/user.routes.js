import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { getUsers, createUserByAdmin, getUserById, deleteUser, updateUser, } from "../controllers/user.controller.js";


const router = Router();

//----------- GET -----------//
router.get('/getUsers', verifyAdmin, getUsers); // Obtener todos los usuarios
router.get('/getUser/:id', verifyAdmin, getUserById); // Obtener usuario por id
//---------------------------//

//---------- POST -----------//
router.post('/admin/users', verifyAdmin,  createUserByAdmin); // Crear usuarios por el administrador
//---------------------------//

//---------- PUT ------------//
router.put('/admin/updateUser/:id', verifyAdmin, updateUser); // Actualizar datos de un usuario
//---------------------------//

//---------- DELETE ---------//
router.delete('/admin/deleteUser/:id', verifyAdmin, deleteUser); // Eliminar usuarios (solo administrador)
//---------------------------//

export default router;