import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BudgetItem } from "../components/types/BudgetItem";
import logoBase64 from "../assets/logoBase64";

export const generarPDFPresupuesto = (
  items: BudgetItem[],
  formaDePago: string = "Efectivo"
) => {
  const doc = new jsPDF();

  // Logo embebido (Base64)
  doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30);  // x, y, ancho, alto

  // Encabezado
  doc.setFontSize(18);
  doc.text("Presupuesto", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 40);
  doc.text(`Cliente: Nombre del Cliente`, 14, 50);
  doc.text(`Forma de Pago: ${formaDePago}`, 14, 60);

  // Tabla de productos
  autoTable(doc, {
    startY: 70,
    head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
    body: items.map((item) => [
      item.product.name,
      item.quantity,
      `$${item.product.price.toFixed(2)}`,
      `$${(item.product.price * item.quantity).toFixed(2)}`,
    ]),
    didDrawCell: (data) => {
      if (data.table.finalY !== undefined) {
        if (data.row.index === items.length - 1) {
          const finalY = data.table.finalY;

          // Total final
          const total = items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          // Mostrar el total
          doc.setFontSize(14);
          doc.text(`Total: $${total.toFixed(2)}`, 14, finalY + 10);

          // Agregar forma de pago
          doc.text(`Forma de pago seleccionada: ${formaDePago}`, 14, finalY + 20);

          // Guardamos el PDF generado después de la tabla y el total
          doc.save("presupuesto.pdf");
        }
      }
    },
  });
};
