// src/types/FormasDePago.ts

export interface FormasDePago {
  id: number;
  nombre: string;
  ajuste: number; // El porcentaje de ajuste (descuento o recargo) que se aplicará al total
}

