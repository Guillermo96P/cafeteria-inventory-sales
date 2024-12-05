import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
        Swal.fire({
          icon: "success",
          title: "Venta registrada",
          text: "La venta se registró exitosamente.",
          confirmButtonText: "Aceptar",
        });

        // Limpiar valores del form
        setQuantity("");
        setProductId("");

        // Refrescar lista de productos
        onSaleCompleted();
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al registrar venta:", error);

        // Mostrar mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al registrar venta",
          text: "Ocurrió un problema al registrar la venta. Stock insuficiente.",
          confirmButtonText: "Aceptar",
        });
      });
  };

  return (
    <div className="product-form-modal">
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
        <div className="form-buttons">
          <button className="btn-primary" type="submit">Registrar Venta</button>
          <button className="btn-secondary" type="button" onClick={closeModal}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;
