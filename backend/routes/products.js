/**
 * Este archivo gestiona las operaciones de Crear, Leer, Actualizar y Eliminar productos
 */

// Importar módulo Express para crear rutas
const express = require('express');

// Crear un enrutador usando Express
const router = express.Router();

// Importar el modelo de Producto
const Product = require('../models/Product');

/**
 * Ruta para obtener todos los productos
 * Metodo: GET
 * URL: /api/products
 * Devuelve una lista de todos los productos almacenados
 */
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Busca los productos en la base de datos
        res.status(200).json(products); // Devuelve los productos como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});

/**
 * Ruta para crear un nuevo producto
 * Metodo: POST
 * URL: /api/products
 * Agrega un nuevo producto a la base de datos
 */
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body); // Crea un nuevo producto con los datos del cuerpo del servidor
        await newProduct.save(); // Guardar el producto en la base de datos
        res.status(201).json(newProduct); // Devuelve el producto creado
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el producto', error });  
    }
});

/**
 * Ruta para actualizar un producto existente
 * Metodo: PUT
 * URL: /api/products/:id
 * Actualiza los datos de un producto usando su ID
 */
router.put('/:id', async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id, // ID del producto obtenido de los parametros de la URL
            req.body, // Datos a actualizar obtenidos del cuerpo de la solicitud
            { new: true } // Devuelve el producto actualizado
        );
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el producto', error });
    }
});

/**
 * Ruta para eliminar un producto
 * Metodo: DELETE
 * URL: /api/products/:id
 * Elimina un producto de la base de datos usando su ID
 */
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id); // Eliminar el producto de la base de datos
        res.status(200).json({ message: 'Producto eliminado con exito' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el producto', error });
    }
});

// Exportar el enrutador (para usarlo en otras partes de la app)
module.exports = router;