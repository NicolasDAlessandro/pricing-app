import { useState } from "react";
import { ProductDetail } from "./ProductDetail";
import { BudgetSummary } from "./BudgetSummary";
import { Product } from "./types/Product";
import { BudgetItem } from "./types/BudgetItem";
import { FormasDePago } from "./types/FormasDePago"; // Asegúrate de tener el tipo
import { generarPDFPresupuesto } from "../utils/pdfGenerator";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Producto 1", description: "Descripción del producto 1", price: 100 },
    { id: 2, name: "Producto 2", description: "Descripción del producto 2", price: 200 },
    { id: 3, name: "Producto 3", description: "Descripción del producto 3", price: 300 },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [budget, setBudget] = useState<BudgetItem[]>([]);

  // Ahora formasDePagoSeleccionadas es un array de formas de pago
  const [formasDePagoSeleccionadas, setFormasDePagoSeleccionadas] = useState<FormasDePago[]>([
    { id: 1, nombre: "Efectivo", ajuste: 0 },
    { id: 2, nombre: "Tarjeta", ajuste: 0 },
    { id: 3, nombre: "Mixto", ajuste: 0 },
  ]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToBudget = (product: Product, quantity: number) => {
    setBudget((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    setSelectedProduct(null);
  };

  const handleRemoveFromBudget = (productId: number) => {
    setBudget((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Cambiar la forma de pago
  const handlePaymentMethodChange = (id: number, amount: number) => {
    setFormasDePagoSeleccionadas((prev) =>
      prev.map((paymentMethod) =>
        paymentMethod.id === id
          ? { ...paymentMethod, ajuste: amount }
          : paymentMethod
      )
    );
  };

  // Generar el PDF con las formas de pago
  const handleGeneratePDF = () => {
    const totalPago = formasDePagoSeleccionadas.reduce(
      (acc, { ajuste }) => acc + ajuste,
      0
    );
    generarPDFPresupuesto(budget, `Efectivo: ${formasDePagoSeleccionadas[0].ajuste}, Tarjeta: ${formasDePagoSeleccionadas[1].ajuste}, Mixto: ${formasDePagoSeleccionadas[2].ajuste}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Nombre</th>
            <th className="text-left p-2">Descripción</th>
            <th className="text-left p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="mt-6">
          <ProductDetail product={selectedProduct} onAdd={handleAddToBudget} />
        </div>
      )}

      <BudgetSummary
        items={budget}
        onRemove={handleRemoveFromBudget}
        formasDePagoSeleccionadas={formasDePagoSeleccionadas}
      />

      <div>
        <h3>Formas de Pago</h3>
        {formasDePagoSeleccionadas.map((formaDePago) => (
          <div key={formaDePago.id}>
            <label>
              {formaDePago.nombre}:
              <input
                type="number"
                value={formaDePago.ajuste}
                onChange={(e) =>
                  handlePaymentMethodChange(formaDePago.id, parseFloat(e.target.value))
                }
              />
            </label>
          </div>
        ))}
        <button
          onClick={handleGeneratePDF}
          className="mt-4 bg-blue-500 text-white p-2"
        >
          Generar PDF
        </button>
      </div>
    </div>
  );
};
