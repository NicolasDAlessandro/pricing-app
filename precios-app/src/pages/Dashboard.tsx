// src/pages/Dashboard.tsx
import { Link, useNavigate, Route } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ProductUploader } from "../components/ProductUploader";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>

      <div className="space-y-4">
        <Link to="/productos" className="block px-4 py-2 bg-blue-500 text-white rounded">Ver Productos</Link>
        <Link to="/presupuestos" className="block px-4 py-2 bg-indigo-500 text-white rounded">Presupuestos</Link>
        <Link to="/upload-productos" className="block px-4 py-2 bg-teal-500 text-white rounded">Cargar Productos (Excel)</Link>
        {/* Más accesos directos si agregás más funciones */}
      </div>

      <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
