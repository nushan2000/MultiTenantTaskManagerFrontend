import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { ReactNode, useContext } from "react";
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);

  if (!auth?.token) return <Navigate to="/login" />;
  if (requiredRole && auth.role !== requiredRole) return <Navigate to="/unauthorized" />;

  return <>{children}</>;
};