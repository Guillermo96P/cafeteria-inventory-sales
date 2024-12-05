import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Componente para listar los productos disponibles
 */
const ProductList = () => {
    const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos

    // Función para cargar productos desde el backend al montar el componente
    useEffect(() => {
        fetchProducts(); // Llama a la función para obtener productos al iniciar
      }, []);
    
      /**
       * Función para obtener los productos desde el servidor
       */
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/products"); // Realiza una solicitud GET
          setProducts(response.data); // Actualiza el estado con los datos obtenidos
        } catch (error) {
          console.error("Error al cargar los productos:", error); // Maneja errores en la solicitud
        }
    };
    /**
     * Función para eliminar un producto
     * @param {string} id - ID del producto a eliminar
     */
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro que quieres eliminar este producto?")) return; // Confirma la eliminacion

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`); // Solicitud DELETE
            alert('Producto eliminado con exito');
            fetchProducts(); // Actualiza la lista de los productos
        } catch (error) {
            console.error('Error al eliminar el producto', error);
            alert('No se pudo eliminar el producto');
        }
    };
    return (
        <div>
          <h2>Lista de Productos</h2>
          {/* Tabla para mostrar los productos */}
          <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Referencia</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Itera sobre los productos y crea una fila por cada producto */}
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.reference}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>
                    {/* Botones para editar y eliminar */}
                    <button
                      onClick={() => alert(`Editar producto: ${product.name}`)}
                      style={{ marginRight: "10px" }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default ProductList;