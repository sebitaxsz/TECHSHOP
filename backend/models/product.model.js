import db from "../db.js" // Importamos la base de datos

export const ProductModel = {
    
    //--------------------------------------- OBTENER PRODUCTOS ----------------------------------------//
    async getProducts() {
        const [result] = await db.query(
            'SELECT * FROM productos'
        );
        return result;
    },
    //--------------------------------------------------------------------------------------------------//

    //------------------------------------- OBTENER PRODUCTO POR ID ------------------------------------//
    async getById(id) {
        const [rows] = await db.query(
            'SELECT id, nombre, descripcion, precio, stock, imagen FROM productos WHERE id = ?',[id]
        );
        return rows[0];
    },
    //--------------------------------------------------------------------------------------------------//

    //---------------------------------------- CREAR PRODUCTO ------------------------------------------//
    async createProduct(nombre, descripcion, precio, stock, imagen) {
        const [result] = await db.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, imagen]
        );
        return result.insertId; // Retorna el ID generado del nuevo registro 
    },
    //--------------------------------------------------------------------------------------------------//

    //--------------------------------------- ACTUALIZAR PRODUCTO --------------------------------------//
    async updateProduct(id, nombre, descripcion, precio, stock, imagen) {
        const [result] = await db.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ? WHERE id = ?',
            [nombre, descripcion, precio, stock, imagen, id]
        );
        return result.affectedRows;
    },
    //--------------------------------------------------------------------------------------------------//

    //--------------------------------------- ELIMINAR PRODUCTO ----------------------------------------//
    async deleteProduct(id) {
        const [result] = await db.query(
            'DELETE FROM productos WHERE id = ?',
            [id]
        );
        return result.affectedRows
    },
    //--------------------------------------------------------------------------------------------------//

}