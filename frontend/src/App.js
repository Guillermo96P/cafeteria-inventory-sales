import React, { useState } from "react";
import ProductList from "./components/ProductList";
import SaleForm from "./components/SaleForm";
import ProductForm from "./components/ProductForm";
import Modal from "react-modal"; // Importar la biblioteca de modales

/**
 * Componente principal de la aplicación.
 */
const App = () => {
  const [isProductFormOpen, setIsProductFormOpen] = useState(false); // Estado para controlar el modal
  const [isSaleFormOpen, setIsSaleFormOpen] = useState(false); // Estado para el modal de realizar venta

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
   * Función para abrir el modal de realizar venta
   */
  const openSaleFormModal = () => {
    setIsSaleFormOpen(true);
  };

  /**
   * Función para cerrar el modal de realizar venta
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
        <ProductForm closeModal={closeProductFormModal} /> {/* Pasamos closeModal */}
      </Modal>

      {/* Modal para el formulario de realizar venta */}
      <Modal
        isOpen={isSaleFormOpen}
        onRequestClose={closeSaleFormModal}
        contentLabel="Realizar Venta"
      >
        <SaleForm closeModal={closeSaleFormModal} /> {/* Pasamos closeModal */}
      </Modal>

      <ProductList /> {/* Lista de Productos / Inventario */}
    </div>
  );
};

export default App;
