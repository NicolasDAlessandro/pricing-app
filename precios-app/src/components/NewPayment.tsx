import { useState } from "react";

interface FormasDePago {
  id: number; 
  nombre: string;
  porcentaje: number;
}

let idCounter = 1; // Contador para los IDs (esto debería ser manejado en la base de datos realmente)

export const FormaDePagoForm = ({ onAdd }: { onAdd: (formapago: FormasDePago) => void }) => {
  const [nombre, setNombre] = useState("");
  const [porcentaje, setPorcentaje] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFormaDePago = { id: idCounter++, nombre, porcentaje };
    onAdd(newFormaDePago);
    setNombre("");
    setPorcentaje(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="nombre">Forma de Pago</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Efectivo, Tarjeta..."
          className="border p-2"
        />

        <label htmlFor="porcentaje">Porcentaje (%)</label>
        <input
          id="porcentaje"
          type="number"
          value={porcentaje}
          onChange={(e) => setPorcentaje(Number(e.target.value))}
          className="border p-2"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Agregar Forma de Pago
        </button>
      </div>
    </form>
  );
};
