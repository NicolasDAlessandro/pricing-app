// src/pages/Dashboard.tsx
import { Link, useNavigate, Route } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import { Product } from "../components/types/Product";
import { ProductUploader } from "../components/ProductUploader";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [uploadedProducts, setUploadedProducts] = useState<Product[]>([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProductsLoaded = (products: Product[]) => {
    setUploadedProducts(products);
    console.log("Productos cargados:", products);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>

      <div className="space-y-4">
        <Link to="/productos" className="block px-4 py-2 bg-blue-500 text-white rounded">Ver Productos</Link>
        <Link to="/presupuestos" className="block px-4 py-2 bg-indigo-500 text-white rounded">Presupuestos</Link>

        {/* ProductUploader directamente en el dashboard */}
        <div className="border p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Cargar Productos (Excel)</h2>
          <ProductUploader onProductsLoaded={handleProductsLoaded} />
          {uploadedProducts.length > 0 && (
            <p className="text-green-600 mt-2">{uploadedProducts.length} productos cargados correctamente.</p>
          )}
        </div>
      </div>

      <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
