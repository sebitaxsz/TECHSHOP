import bcrypt from 'bcrypt'; // Libreria para encriptacion de contraseñas
import jwt from 'jsonwebtoken'; // Libreria para token 
import { UserModel } from '../models/user.model.js'; // Importamos el modelo de usuarios

//---------------------------------- METODO PARA LOGIN --------------------------------//

export const loginUser = async (req, res) => {
    try {   
        // Capturamos los datos enviados desde el formulario
        const { correo, contraseña} = req.body;

        // Buscamos si el usuario existe en la base de datos por su correo
        const user = await UserModel.findByEmail(correo);
        if (!user) {
            return res.status(401).json({
                error: 'Credenciales invalidas'
            })
        }

        // Comparamos la contraseña enviada con la contraseña ya encriptada
        const isPasswordValid = await bcrypt.compare(contraseña, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Credenciales invalidas'
            });
        }
        
        // Creamos el JWT con los datos del usuario
        const token = jwt.sign(
            {
                id: user.id, 
                correo: user.correo, 
                rol_id: user.rol_id
            },
            process.env.JWT_SECRET || 'clave_secreta_temporal',
            { expiresIn: '2h'}
        );

        // Responder con exito enviando el token al cliente
        return res.status(200).json({
            message: 'Inicio de sesion exitoso',
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar iniciar sesion, intente nuevamente'
        })
    }
};

//-------------------------------------------------------------------------------------//

//-------------------------------- METODO REGISTRAR USUARIO -------------------------- //

export const registerUser = async (req, res) => {
    try {
        // Capturamos los datos enviados desde la peticion
        const { nombre, apellido, correo, contraseña, repetirContraseña } = req.body;

        // Validamos si las contraseñas coinciden
        if (contraseña !== repetirContraseña) {
            return res.status(400).json({
                error: 'Las contraseñas no coinciden'
            });
        }

        // Validamos si el correo ya esta registrado
        const existingUser = await UserModel.findByEmail(correo);
        if (existingUser) {
            return res.status(400).json({
                error: 'El correo ya esta registrado'
            });
        }

        // Encriptamos la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        // Definimos el rol por defecto que tendra este usuario (id 3 = usuarios)
        const DEFAULT_ROL_ID = 3

        // Llamamos al modelo hace guardar los datos en la BD
        await UserModel.createUser(nombre, apellido, correo, hashedPassword, DEFAULT_ROL_ID);

        // Respondemos el mensaje exitoso
        return res.status(201).json({
            message: 'Usuario creado exitosamente'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar crear usuario, intente de nuevo'
        })
    }
};

//-------------------------------------------------------------------------------------//