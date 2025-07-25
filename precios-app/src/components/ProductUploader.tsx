import { useState } from "react";
import * as XLSX from "xlsx";
import { Product } from "./types/Product"; // Asumimos que tienes una interfaz Product

export const ProductUploader = ({ onProductsLoaded }: { onProductsLoaded: (products: Product[]) => void }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Tomamos la primera hoja
        const productsData: Product[] = XLSX.utils.sheet_to_json(sheet);

        // Aquí puedes realizar alguna validación si es necesario
        // Por ejemplo, puedes asegurarte de que cada producto tiene un nombre y precio válidos

        onProductsLoaded(productsData); // Pasamos los productos cargados al componente padre
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {file && <p>Archivo cargado: {file.name}</p>}
    </div>
  );
};
