import { updateUser } from '../controllers/user.controller.js';
import db from '../db.js' // Importamos la base de datos

export const UserModel = {
    // Buscamos si el correo existe en la base de datos
    async findByEmail(correo){
        const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        return rows[0]; // Retorna el usuario en caso de que exista o undefined si no
    },

    //--------------------------------------- OBTENER USUARIOS ------------------------------------------//
    async getUsers() {
        const [result] = await db.query(
            'SELECT * FROM usuarios'
        );
        return result //
    },
    //--------------------------------------------------------------------------------------------------//

    //------------------------------------- OBTENER USUARIO POR ID -------------------------------------//
    async getById(id) {
        const [rows] = await db.query(
            'SELECT id, nombre, apellido, correo, rol_id FROM usuarios WHERE id = ?',[id]
        );
        return rows[0];
    },
    //--------------------------------------------------------------------------------------------------//

    //---------------------------------------- CREAR USUARIO -------------------------------------------//

    async createUser(nombre, apellido, correo, hashedPassword, rol_id) {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, apellido, correo, password, rol_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, correo, hashedPassword, rol_id]
        );
        return result.insertId; // Retorna el ID generado del nuevo registro
    },

    //--------------------------------------------------------------------------------------------------//

    //------------------------------------ CREAR USUARIO CON ROL ---------------------------------------//

    async createUserWithRole(nombre, apellido, correo, hashedPassword, rol_id) {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, apellido, correo, password, rol_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, correo, hashedPassword, rol_id]
        );
        return result.insertId;
    },

    //--------------------------------------------------------------------------------------------------//

    //----------------------------------------- ACTUALIZAR USUARIO -------------------------------------//
    async updateUser(id, nombre, apellido, correo, rol_id) {
        const [result] = await db.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, rol_id = ? WHERE id = ?',
            [nombre, apellido, correo, rol_id, id]
        );
        return result.affectedRows;
    },
    //--------------------------------------------------------------------------------------------------//

    //---------------------------------------- ELIMINAR USUARIO ----------------------------------------//
    async deleteUser(id) {
        const [result] = await db.query(
            'DELETE FROM usuarios WHERE id = ?', [id]
        );
        return result.affectedRows;
    },
    //--------------------------------------------------------------------------------------------------//

}