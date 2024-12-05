// Importar el módulo Express y el modelo de ventas
const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Crear un enrutador usando Express
const router = express.Router();

/**
 * Ruta para registrar una nueva venta
 * Método: POST
 * URL: /api/sales
 * Registra una venta y actualiza el stock de un producto
 */
router.post('/', async (req, res) => {
    try {
        const { productId, quantity } = req.body; // Obtener el ID del producto y la cantidad vendida

        // Verificar que el producto existe y tiene stock suficiente
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Stock insuficiente' });
        }

        // Crear la venta
        const sale = new Sale({ productId, quantity });
        await sale.save();

        // Actualizar el stock del producto
        product.stock -= quantity;
        await product.save();

        res.status(201).json({ message: 'Venta registrada con exito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la venta', error });
    }
});

/**
 * Ruta para obtener todas las ventas
 * Metodo: GET
 * URL /api/sales
 * Devuelve una lista de todas las ventas realizadas
 */
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find().populate('productId'); // Obtener ventas con detalles del producto
        res.status(200).json(sales); // Enviar las ventas como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas', error });
    }
});

// Exportar el enrutador
module.exports = router;