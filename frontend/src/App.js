import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import SaleForm from "./components/SaleForm";
import ProductForm from "./components/ProductForm";
import Modal from "react-modal"; // Importar la biblioteca de modales
import axios from "axios";

/**
 * Componente principal de la aplicación
 */
const App = () => {
  const [products, setProducts] = useState([]); // Estado global para productos
  const [sales, setSales] = useState([]); // Estado para historial de ventas
  const [isProductFormOpen, setIsProductFormOpen] = useState(false); // Estado para el modal de agregar producto
  const [isSaleFormOpen, setIsSaleFormOpen] = useState(false); // Estado para el modal de realizar venta

  /**
   * Cargar los productos desde el backend
   */
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  // Cargar el historial de Ventas
  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sales');
      setSales(response.data);
    } catch (error) {
      console.error('Error al cargar las ventas', error);
    }
  };

  // Cargar productos y ventas al montar el componente
  useEffect(() => {
    fetchProducts();
    fetchSales();
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

      <button onClick={openProductFormModal}>Agregar Producto</button>
      <button onClick={openSaleFormModal}>Realizar Venta</button>

      {/* Modal para agregar producto */}
      <Modal isOpen={isProductFormOpen} onRequestClose={closeProductFormModal}>
        <ProductForm closeModal={closeProductFormModal} onProductAdded={fetchProducts} />
      </Modal>

      {/* Modal para realizar venta */}
      <Modal isOpen={isSaleFormOpen} onRequestClose={closeSaleFormModal}>
        <SaleForm closeModal={closeSaleFormModal} products={products} onSaleCompleted={fetchSales} />
      </Modal>

      {/* Lista de productos */}
      <ProductList products={products} />

      {/* Tabla del historial de ventas */}
      <h2>Historial de Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>Número de Venta</th>
            <th>Nombre del Producto</th>
            <th>Cantidad</th>
            <th>Precio Total</th>
            <th>Fecha de Venta</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale._id}</td>
              <td>{sale.productId ? sale.productId.name : "Producto no disponible"}</td>
              <td>{sale.quantity}</td>
              <td>{sale.productId ? sale.productId.price * sale.quantity : "N/A"}</td>
              <td>{new Date(sale.createdAt).toLocaleString()}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
