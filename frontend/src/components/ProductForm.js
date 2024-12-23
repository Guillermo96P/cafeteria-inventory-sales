import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert para las notificaciones

/**
 * Componente de formulario para agregar un nuevo producto al inventario.
 */
const ProductForm = ({ closeModal, onProductAdded }) => {
  const [name, setName] = useState("");
  const [reference, setReference] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/products", {
        name,
        reference,
        price: parseInt(price),
        weight: parseInt(weight),
        category,
        stock: parseInt(stock),
      });

      // Alerta de producto agregado
      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: `Se agregó correctamente: ${response.data.name}`,
        confirmButtonText: "Aceptar",
      });

      setName("");
      setReference("");
      setPrice("");
      setWeight("");
      setCategory("");
      setStock("");

      // Refrescar lista de productos
      onProductAdded();
      closeModal();
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el producto. Inténtalo nuevamente.",
      });
    }
  };

  return (
    <div className="product-form-modal">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Referencia"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Peso (g)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button className="btn-primary" type="submit">Agregar Producto</button>
          <button className="btn-secondary" type="button" onClick={closeModal}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
