import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // Importar libreria de modales

/**
 * Componente para listar los productos disponibles
 */
const ProductList = () => {
    const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
    const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para editar
    const [formData, setFormData] = useState({}); // Estado para almacenar los datos del formulario

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
     * Función para abrir el modal con el producto seleccionado
     * @param {Object} product - Producto seleccionado
     */
    const openEditModal = (product) => {
        setSelectedProduct(product); // Establece el producto seleccionado
        setFormData(product); // Precarga los datos del producto en el form
        setIsModalOpen(true);
    };

    /**
     * Función para cerrar el modal
     */
    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
        setSelectedProduct(null); // Limpia el producto seleccionado
    };

    /**
     * Función para manejar cambios en el form
     * @param {Event} e - Evento del formulario
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre y el valor del input
        setFormData({ ...formData, [name]: value });  // Actualiza el estado del formulario
    };

    /**
     * Función para guardar los cambios en el producto
     */
     const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, formData); // Realiza la solicitud PUT
            alert('Producto actualizado con exito');
            fetchProducts(); // Refresca la lista de productos
            closeModal(); // Cierra el modal
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            alert('No se puede actualizar el producto');
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
                <th>Peso (g)</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Fecha de Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.reference}</td>
                  <td>{product.price}</td>
                  <td>{product.weight}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{new Date(product.createdAt).toLocaleString('es-ES', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    hour12: false 
                    })}
                  </td>
                  <td>
                    <button
                      onClick={() => openEditModal(product)}
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
    
          {/* Modal para editar el producto */}
          <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Editar Producto">
            <h2>Editar Producto</h2>
            <form>
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Referencia:
                <input
                  type="text"
                  name="reference"
                  value={formData.reference || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Precio:
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Categoría:
                <input
                  type="text"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ""}
                  onChange={handleInputChange}
                />
              </label>
            </form>
            <button onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
              Guardar Cambios
            </button>
            <button onClick={closeModal}>Cancelar</button>
          </Modal>
        </div>
      );
};

export default ProductList;