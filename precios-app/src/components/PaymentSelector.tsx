import { useState } from "react";

interface PaymentOption {
  name: string;
  value: number; // Factor de ajuste (ej: 1.25 para 12 cuotas)
}

interface PaymentSelectorProps {
  total: number; // Total de los productos (sin el ajuste)
  onPaymentChange: (payment: PaymentOption, adjustedAmount: number) => void;
  onManualChange: (manualAmount: number) => void; // Función para manejar el cambio manual
}

export const PaymentSelector = ({ total, onPaymentChange, onManualChange }: PaymentSelectorProps) => {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [manualPrice, setManualPrice] = useState<number>(total); // Inicializamos con el precio total base

  const paymentOptions: PaymentOption[] = [
    { name: "Efectivo", value: 1 }, // No hay ajuste
    { name: "Tarjeta (12 cuotas)", value: 1.25 },
    { name: "Tarjeta (6 cuotas)", value: 1.15 },
    { name: "Transferencia", value: 0.98 },
  ];

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPayment(e.target.value);
    const selectedOption = paymentOptions.find(
      (option) => option.name === e.target.value
    );
    if (selectedOption) {
      const adjustedAmount = total * selectedOption.value;
      onPaymentChange(selectedOption, adjustedAmount);
      setManualPrice(adjustedAmount); // Actualizamos el precio ajustado con el pago seleccionado
    }
  };

  const handleManualPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPrice = parseFloat(e.target.value);
    setManualPrice(updatedPrice);
    onManualChange(updatedPrice); // Actualizamos el precio manual
  };

  return (
    <div>
      <h3>Seleccionar Forma de Pago</h3>
      <select value={selectedPayment} onChange={handlePaymentChange}>
        <option value="">Seleccione una forma de pago</option>
        {paymentOptions.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>

      <div>
        <h4>Precio Final Ajustado</h4>
        <input
          type="number"
          value={manualPrice}
          onChange={handleManualPriceChange}
          step="0.01"
          min="0"
        />
      </div>
    </div>
  );
};
