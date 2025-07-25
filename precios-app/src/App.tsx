import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { ProductList } from "./components/ProductList";
import { BudgetSummary } from "./components/BudgetSummary";
import { ProductUploader } from "./components/ProductUploader";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload-productos"
            element={
              <PrivateRoute>
                <ProductUploader onProductsLoaded={() => {}} />
              </PrivateRoute>
            }
          />
          <Route
            path="/presupuestos"
            element={
              <PrivateRoute>
                <BudgetSummary
                  items={[]}
                  onRemove={() => {}}
                  formasDePagoSeleccionadas={[]}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
