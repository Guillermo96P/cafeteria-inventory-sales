// Importar mongoose para definir esquema
const mongoose = require('mongoose');

/**
 * Esquema de datos para las ventas
 * Este esquema define como se almacenan los datos de las ventas en MongoDB
 */

const saleSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // ID del producto relacionado
        ref: 'Product', // Referencia al modelo Producto
        required: true
    },
    quantity: {
        type: Number, // Cantidad vendida
        required: true
    },
}, {timestamps: true});

// Exportar el modelo
module.exports = mongoose.model('Sale', saleSchema);