import React, { useState } from "react";
import axios from "axios";

/**
 * Componente de formulario para agregar un nuevo producto al inventario
 */
const ProductForm = ({ closeModal }) => {
    // Estados para almacenar los datos del formulario
    const [name, setName] = useState('');
    const [reference, setReference] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    // Manejar el envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            // Enviar los datos al backend utilizando POST
            const response = await axios.post('http://localhost:5000/api/products', {
                name,
                reference,
                price: parseInt(price), // Precio debe ser entero
                weight: parseInt(weight), // Peso debe ser entero
                category,
                stock: parseInt(stock), // Stock debe ser entero
            });

            // Mostrar mensaje de exito al usuario
            alert(`Producto agregado: ${response.data.name}`);

            // Limpiar el formulario
            setName('');
            setReference('');
            setPrice('');
            setWeight('');
            setCategory('');
            setStock('');

            // Cerrar el modal después de agregar el producto
            closeModal();
        } catch (error) {
            console.error('Error al agregar producto', error);
            alert('Error al agregar producto, inténtalo nuevamente.');
        }
    };

    return (
        <div>
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Nombre del Producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Referencia"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    placeholder="Peso (g)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default ProductForm;