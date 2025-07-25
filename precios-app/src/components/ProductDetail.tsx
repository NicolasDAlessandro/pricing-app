// src/components/ProductDetail.tsx
import { useState } from "react";
import { Product } from "./types/Product";

interface ProductDetailProps {
  product: Product;
  onAdd: (product: Product, quantity: number) => void; 
}

export const ProductDetail = ({ product, onAdd }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    if (quantity > 0) {
      onAdd(product, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="border rounded p-4 shadow mt-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <p className="mt-2 font-semibold">Precio base: ${product.price}</p>

      <div className="mt-2">
        <label className="mr-2">Cantidad:</label>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
      </div>
    </div>
  );
};
