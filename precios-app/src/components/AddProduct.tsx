// src/components/AddProduct.tsx
import { useState } from "react";
import axios from "axios";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);  // Aquí el precio base puede ser cualquier número
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { 
      name, 
      description, 
      price,  // Guardar el precio base
      paymentMethod
    };

    // Enviar el nuevo producto al backend con su precio base
    axios.post("http://localhost:5000/api/products", newProduct)
      .then(response => {
        alert("Producto agregado correctamente!");
        // Aquí podrías hacer algo más, como actualizar la lista de productos
      })
      .catch(error => {
        console.error("Error al agregar producto:", error);
        alert("Error al agregar el producto");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campos del formulario */}
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Precio Base</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="border p-2"
        />
      </div>
      <div>
        <label>Forma de Pago</label>
        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Agregar Producto
      </button>
    </form>
  );
};
