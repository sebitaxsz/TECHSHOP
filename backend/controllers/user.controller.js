import bcrypt from 'bcrypt'; // Libreria para encriptar contraseña
import { UserModel } from '../models/user.model.js'; // Importamos el modelo de usuarios

//------------------------------- OBTENER TODOS LOS USUARIOS --------------------------//

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener los usuarios'
        })
    }
};

//-------------------------------------------------------------------------------------//

//------------------------------- OBTENER USUARIOS POR ID -----------------------------//

export const getUserById = async (req, res) => {
    try {
        // Capturamos el id que se pasa
       const { id } = req.params;
       const user = await UserModel.getById(id);
       
       // Validamos que el usuario exista, si no existe que tire un error
       if (!user) {
        return res.status(400).json({
            error: 'Usuario No Encontrado'
        });
       }

       // En caso de que el id coincida con un usuario, muestre sus datos.
       return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener el usuario'
        })
    }
};

//-------------------------------------------------------------------------------------//

// ---------------------------- CREAR USUARIOS CON ROL --------------------------------//

export const createUserByAdmin = async (req, res) => {
    try {

        // Capturamos los datos enviados desde el formulario
        const { nombre, apellido, correo, contraseña, rol_id } = req.body;

        // Validamos que todos los campos se esten llenando
       if (!nombre || !apellido || !correo || !contraseña || !rol_id) {
            return res.status(400).json({
                error: 'Todos los campos deben estar llenos'
            });
        };

        // Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Aqui es donde se elige el rol mediante id
        await UserModel.createUserWithRole(nombre, apellido, correo, hashedPassword, rol_id);

        // Si todo sale bien creamos el usuario
        return res.status(201).json({
            message: 'Usuario creado exitosamente por el administrador'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar crear un usuario'
        });
    }
};

//-------------------------------------------------------------------------------------//

// ------------------------------ ACTUALIZAR USUARIOS  --------------------------------//
export const updateUser = async (req, res) => {
    try {
        // Validamos el id que se le pasa
        const { id } = req.params;
        // Extraemos los datos que se pasan por el body
        const { nombre, apellido, correo, rol_id } = req.body;

        // Llamaos el modelo y actualizamos
        const affectedRows = await UserModel.updateUser(id, nombre, apellido, correo, rol_id);

        if (affectedRows === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            })
        }

        return res.status(200).json({
            message: 'Usuario actualizado exitosamente'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Erro al intentar actualizar el usuario'
        });
    }
};
//-------------------------------------------------------------------------------------//

// -------------------------------- ELIMINAR USUARIOS  --------------------------------//
export const deleteUser = async (req, res) => {
    try {
        // Validamos el id que se le pasara 
        const { id } = req.params;
        const affectedRows = await UserModel.deleteUser(id);
        
        // Validamos que el usuario exista, si no existe que tire un error
        // Se valida mediante el affectedRows, si es 0 significa que el ID no existia
        if (affectedRows === 0) {
            return res.status(400).json({
                error: 'Usuario No Encontrado'
            });
        }

        return res.status(200).json({
            message: 'Usuario eliminado exitosamente'
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar eliminar el usuario'
        });
    }
};
//-------------------------------------------------------------------------------------//