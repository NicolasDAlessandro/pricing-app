// src/components/PaymentMethods.tsx
import { useEffect, useState } from "react";
import axios from "axios";

export const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  useEffect(() => {
    // Obtener las formas de pago desde la API
    axios.get("http://localhost:5000/api/paymentmethods")
      .then(response => setPaymentMethods(response.data))
      .catch(error => console.error("Error al cargar las formas de pago", error));
  }, []);

  return (
    <div>
      <h2>Formas de Pago</h2>
      <ul>
        {paymentMethods.map((method) => (
          <li key={method.id}>{method.name}</li>
        ))}
      </ul>
    </div>
  );
};
