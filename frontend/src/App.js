import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import SaleForm from "./components/SaleForm";
import ProductForm from "./components/ProductForm";
import Modal from "react-modal"; // Importar la biblioteca de modales
import axios from "axios";

/**
 * Componente principal de la aplicación.
 */
const App = () => {
  const [products, setProducts] = useState([]); // Estado global para productos
  const [isProductFormOpen, setIsProductFormOpen] = useState(false); // Estado para el modal de agregar producto
  const [isSaleFormOpen, setIsSaleFormOpen] = useState(false); // Estado para el modal de realizar venta

  /**
   * Cargar los productos desde el backend.
   */
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Función para abrir el modal de agregar producto.
   */
  const openProductFormModal = () => {
    setIsProductFormOpen(true);
  };

  /**
   * Función para cerrar el modal de agregar producto.
   */
  const closeProductFormModal = () => {
    setIsProductFormOpen(false);
  };

  /**
   * Función para abrir el modal de realizar venta.
   */
  const openSaleFormModal = () => {
    setIsSaleFormOpen(true);
  };

  /**
   * Función para cerrar el modal de realizar venta.
   */
  const closeSaleFormModal = () => {
    setIsSaleFormOpen(false);
  };

  return (
    <div>
      <h1>Gestión de Inventario y Ventas</h1>

      {/* Botón para abrir el modal de agregar producto */}
      <button onClick={openProductFormModal} style={{ marginBottom: "20px", marginRight: "10px" }}>
        Agregar Producto
      </button>

      {/* Botón para abrir el modal de realizar venta */}
      <button onClick={openSaleFormModal} style={{ marginBottom: "20px" }}>
        Realizar Venta
      </button>

      {/* Modal para el formulario de agregar producto */}
      <Modal
        isOpen={isProductFormOpen}
        onRequestClose={closeProductFormModal}
        contentLabel="Agregar Producto"
      >
        <ProductForm closeModal={closeProductFormModal} onProductAdded={fetchProducts} />
      </Modal>

      {/* Modal para el formulario de realizar venta */}
      <Modal
        isOpen={isSaleFormOpen}
        onRequestClose={closeSaleFormModal}
        contentLabel="Realizar Venta"
      >
        <SaleForm closeModal={closeSaleFormModal} products={products} onSaleCompleted={fetchProducts} />
      </Modal>

      <ProductList products={products} /> {/* Lista de Productos */}
    </div>
  );
};

export default App;
