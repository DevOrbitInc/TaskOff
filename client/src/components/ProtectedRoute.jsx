import { Navigate } from "react-router-dom";
import AppShell from "./AppShell.jsx";
import useAuth from "../hooks/useAuth.js";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AppShell>{children}</AppShell>;
}

export default ProtectedRoute;
