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

  return (
    <div>
      <h1>Gestión de Inventario y Ventas</h1>

      {/* Botón para abrir el modal de agregar producto */}
      <button onClick={openProductFormModal} style={{ marginBottom: "20px" }}>
        Agregar Producto
      </button>

      {/* Modal para el formulario de agregar producto */}
      <Modal
        isOpen={isProductFormOpen}
        onRequestClose={closeProductFormModal}
        contentLabel="Agregar Producto"
      >
        <ProductForm closeModal={closeProductFormModal} /> {/* Pasamos closeModal */}
      </Modal>

      <ProductList /> {/* Lista de Productos / Inventario */}
      <SaleForm /> {/* Formulario para Registrar Ventas */}
    </div>
  );
};

export default App;
