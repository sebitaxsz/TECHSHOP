import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    // Capturar el token que viene en los headers (ej. Authorization: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extraer solo el token

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificar que el token sea válido con la llave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_temporal');
        
        // El token guarda los datos que le pasamos al hacer el login: { id, correo, rol_id }
        req.user = decoded; 

        // Validar si el rol es el de Administrador
        const ADMIN_ROL_ID = 1; 

        if (req.user.rol_id !== ADMIN_ROL_ID) {
            return res.status(403).json({ error: 'Acceso prohibido. Se requiere rol de administrador.' });
        }

        // Si pasa ambas validaciones, permitimos que continúe hacia el controlador
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};