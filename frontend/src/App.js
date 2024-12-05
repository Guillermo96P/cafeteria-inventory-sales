import React from "react";
import ProductList from "./components/ProductList";
import SaleForm from "./components/SaleForm";
import ProductForm from "./components/ProductForm";

const App = () => (
  <div>
    <h1>Gestión de Inventario y Ventas</h1>
    <ProductForm /> {/* Formulario para agregar productos */}
    <ProductList /> {/* Lista de Productos / Inventario */}
    <SaleForm /> {/* Formulario para Registrar ventas */}
  </div>
);

export default App;