// Este modelo define la estructura de los productos que se almacenarán en la base de datos

// Importar mongoose para deinir esquemas y modelos
const mongoose = require('mongoose');

/**
 * Esquema de datos para los productos
 * Este esquema define como se almacenan los datos en MongoDB
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Por defecto sera la fecha actual
        required: true,
    },
});

// Exportar el modelo
module.exports = mongoose.model('Product', productSchema);