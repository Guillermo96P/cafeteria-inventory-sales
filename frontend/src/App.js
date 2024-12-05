import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import SaleForm from "./components/SaleForm";
import ProductForm from "./components/ProductForm";
import Modal from "react-modal"; // Importar la biblioteca de modales
import axios from "axios";
import './App.css'; // Importar estilos

/**
 * Componente principal de la aplicación
 */
const App = () => {
  const [products, setProducts] = useState([]); // Estado global para productos
  const [sales, setSales] = useState([]); // Estado para historial de ventas
  const [isProductFormOpen, setIsProductFormOpen] = useState(false); // Estado para el modal de agregar producto
  const [isSaleFormOpen, setIsSaleFormOpen] = useState(false); // Estado para el modal de realizar venta
  const [currentPage, setCurrentPage] = useState(1); // Estado de la paginación
  const rowsPerPage = 4;

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
   * Función para manejar el cambio de página
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el índice de las filas que se deben mostrar en la página actual
  const indexOfLastSale = currentPage * rowsPerPage;
  const indexOfFirstSale = indexOfLastSale - rowsPerPage;
  const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale); // Filtrar las ventas para mostrar solo las correspondientes a la página actual

  // Número total de páginas
  const totalPages = Math.ceil(sales.length / rowsPerPage);

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
    <div className="app-container">
      <header className="header">
        <h1>Gestión de Inventario y Ventas</h1>
      </header>
      <main>
        <div className="button-container">
          <button className="btn btn-primary" onClick={openProductFormModal}>
            Agregar Producto
          </button>
          <button className="btn btn-secondary" onClick={openSaleFormModal}>
            Realizar Venta
          </button>
        </div>

        <Modal isOpen={isProductFormOpen} onRequestClose={closeProductFormModal}>
          <ProductForm closeModal={closeProductFormModal} onProductAdded={fetchProducts} />
        </Modal>

        <Modal isOpen={isSaleFormOpen} onRequestClose={closeSaleFormModal}>
          <SaleForm closeModal={closeSaleFormModal} products={products} onSaleCompleted={fetchSales} />
        </Modal>

        <ProductList products={products} />

        <h2>Historial de Ventas</h2>
        <table className="sales-table">
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
            {currentSales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale._id}</td>
                <td>{sale.productId ? sale.productId.name : "Producto no disponible"}</td>
                <td>{sale.quantity}</td>
                <td>{sale.productId ? sale.productId.price * sale.quantity : "N/A"}</td>
                <td>
                  {new Date(sale.createdAt).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Paginación */}
        <div className="pagination-container">
          <button 
            disabled={currentPage === 1} 
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </button>
          <span>{currentPage} de {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
