import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Componente para registrar una venta seleccionando un producto y cantidad
 */

const SaleForm = ({ closeModal }) => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');

    // Cargar productos disponibles al montar el componente
    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
        .then(response => {
            const avaibleProducts = response.data.filter(p => p.stock > 0); // Solo productos con Stock
            setProducts(avaibleProducts);
        })
        .catch(error => {
            console.error('Error al cargar los productos', error);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/sales', { productId, quantity })
        .then(() => {
            alert('Venta registrada con exito');
            setQuantity('');
            setProductId('');

            // Cerrar el modal
            closeModal();
        })
        .catch(error => {
            console.error('Error al registrar venta:', error);
        });
    };

    return (
        <div>
            <h2>Registrar Venta</h2>
            <form onSubmit={handleSubmit}>
                <select value={productId} onChange={e => setProductId(e.target.value)} required>
                    <option value="">Seleccionar Producto</option>
                    {products.map(product => (
                        <option key={product._id} value={product._id}>
                            {product.name} (Stock: {product.stock})
                        </option>
                    ))}
                </select>
                <input 
                  type="number"
                  placeholder="Cantidad"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  required
                />
                <button type="submit">Registrar Venta</button>
            </form>
        </div>
    );
};

export default SaleForm;