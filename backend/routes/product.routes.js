import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js";

const router = Router();

//----------- GET -----------//
router.get('/getProducts', getProducts); // Ver todos los productos
router.get('/getProductById/:id', getProductById); // Ver un producto especifico por id
//---------------------------//

//---------- POST -----------//
router.post('/createProduct', verifyAdmin, createProduct); // Crear producto (solo administradores)
//---------------------------//

//---------- PUT ------------//
router.put('/admin/updateProduct/:id', verifyAdmin, updateProduct); // Actualizar producto (Solo administradores)
//---------------------------//

//---------- DELETE ---------//
router.delete('/admin/deleteProduct/:id', verifyAdmin, deleteProduct); // Eliminar producto (Solo Administradores)
//---------------------------//

export default router;