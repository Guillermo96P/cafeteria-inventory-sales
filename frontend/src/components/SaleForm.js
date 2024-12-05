import React, { useState } from "react";
import axios from "axios";

/**
 * Componente para registrar una venta seleccionando un producto y cantidad.
 */
const SaleForm = ({ closeModal, products, onSaleCompleted }) => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/sales", { productId, quantity })
      .then(() => {
        alert("Venta registrada con éxito");
        setQuantity("");
        setProductId("");

        // Refrescar lista de productos
        onSaleCompleted();
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al registrar venta:", error);
      });
  };

  return (
    <div>
      <h2>Registrar Venta</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value="">Seleccionar Producto</option>
          {products
            .filter((product) => product.stock > 0) // Filtrar productos con stock > 0
            .map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} (Stock: {product.stock})
              </option>
            ))}
        </select>
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Registrar Venta</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
};

export default SaleForm;
