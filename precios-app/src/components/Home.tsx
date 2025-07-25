// src/components/Home.tsx
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la App de Presupuestos</h1>
      <p className="mb-6">Iniciá sesión o registrate para comenzar</p>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Iniciar Sesión</Link>
        <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Registrarse</Link>
      </div>
    </div>
  );
};
