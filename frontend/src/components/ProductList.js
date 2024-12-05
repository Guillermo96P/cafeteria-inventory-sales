import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Componente para listar los productos disponibles
 */
const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Cargar productos desde el servidor al montar el componente
    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
    }, []);
    return (
        <div>
            <h2>Lista de Productos</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - Stock: {product.stock}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;