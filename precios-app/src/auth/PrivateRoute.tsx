import React, { ReactNode } from "react"; 
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { JSX } from "react/jsx-runtime";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
