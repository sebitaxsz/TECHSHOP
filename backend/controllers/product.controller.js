import { ProductModel } from "../models/product.model.js";


//------------------------------- OBTENER TODOS LOS PRODUCTOS  --------------------------//
export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.getProducts();

        // Este map agrega la URL completa de la imagen a cada producto
        const productsWithImage = products.map(product => ({
            ...product,
            imagen: product.imagen
            ? `${req.protocol}://${req.get('host')}/uploads/${product.imagen}`: null
        }));

        return res.status(200).json(productsWithImage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar obtener los productos'
        });
    }
};
//---------------------------------------------------------------------------------------//

//-------------------------------- OBTENER PRODUCTOS POR ID  ----------------------------//
export const getProductById = async (req, res) => {
    try {
        // Validamos el id que se le pasa
        const { id } = req.params;
        const product = await ProductModel.getById(id);

        // Validamos que el producto exista
        if (!product) {
            return res.status(400).json({
                error: 'Error al intentar obtener el producto'
            });
        }

        // Este map agrega la URL completa de la imagen a cada producto
        const productsWithImage = products.map(product => ({
            ...product,
            imagen: product.imagen
            ? `${req.protocol}://${req.get('host')}/uploads/${product.imagen}`: null
        }));

        // En caso de que el producto exista mostramos sus datos
        return res.status(200).json(productsWithImage);


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar obtener el producto'
        })
    }
};
//---------------------------------------------------------------------------------------//

//------------------------------------- CREAR PRODUCTO  ---------------------------------//
export const createProduct = async (req, res) => {
try {
    // Capturamos los datos enviados por el body/formulario
    const {nombre, descripcion, precio, stock } = req.body;

    // Guardamos la imagen enviada
    // Guardamos solo el nombre del archivo en la variable imagen, si no se subio nada sera null
    const imagen = req.file ? req.file.filename : null;
    const papoi = req.fila ? req.file.file : null;

    // Validamos los campos minimos necesarios para crear un producto
    if (!nombre || !descripcion || !precio || !stock || !imagen ) {
        return res.status(400).json({
            error: 'Campos minimos necesarios: nombre, precio, stock'
        });
    }

    await ProductModel.createProduct(nombre, descripcion, precio, stock, imagen);

    // Si todo esta bien creamos el producto
    return res.status(200).json({
        message: 'Producto creado exitosamente'
    });

} catch (error) {
    console.error(error);
    return res.status(500).json({
        error: 'Error al intentar crear el producto'
    });
}
};
//---------------------------------------------------------------------------------------//

//---------------------------------- ACTUALIZAR PRODUCTO   ------------------------------//
export const updateProduct = async (req, res) => {
    try {
        // Validamos el id que se le pasa
        const { id } = req.params;
    
        // Extraemos los datos traidos por el body
        const { nombre, descripcion, precio, stock, imagen } = req.body;

        // Llamamos al modelo y lo actualizamos
        const affectedRows = await ProductModel.updateProduct(id, nombre, descripcion, precio, stock, imagen);

        if (affectedRows === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            message: 'Producto actualizado exitosamente'
        });

    } catch (error) {   
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar actualizar el producto'
        })
    }
};
//---------------------------------------------------------------------------------------//

//------------------------------------ ELIMINAR PRODUCTOS  ------------------------------//
export const deleteProduct = async (req, res) => {
    try {
        // Validamos el id que se obtiene
        const { id } = req.params;
        // Llamamos al modelo pasandole el id
        const affectedRows = await ProductModel.deleteProduct(id);

        if (affectedRows === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            message: 'Producto eliminado exitosamente'
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al intentar eliminar el producto'
        })    
    }
};
//---------------------------------------------------------------------------------------//