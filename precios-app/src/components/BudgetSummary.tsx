import React from "react";
import { BudgetItem } from "./types/BudgetItem";
import { FormasDePago } from "./types/FormasDePago"; // Asegúrate de tener este tipo de dato definido

interface Props {
  items: BudgetItem[];
  onRemove: (productId: number) => void;
  formasDePagoSeleccionadas: FormasDePago[]; // Asegúrate de definir este tipo de datos correctamente
}

export const BudgetSummary: React.FC<Props> = ({
  items,
  onRemove,
  formasDePagoSeleccionadas,
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const applyPaymentMethods = () => {
    let totalWithPayments = total;

    formasDePagoSeleccionadas.forEach((paymentMethod) => {
      const adjustment = (total * paymentMethod.ajuste) / 100;
      totalWithPayments += adjustment; // Suma o resta según el porcentaje de la forma de pago
    });

    return totalWithPayments;
  };

  const finalTotal = applyPaymentMethods();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Resumen del presupuesto</h3>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.product.price}</td>
              <td>{(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => onRemove(item.product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h4>Total: ${(total).toFixed(2)}</h4>
        <h4>Total con formas de pago: ${(finalTotal).toFixed(2)}</h4>
      </div>
    </div>
  );
};
