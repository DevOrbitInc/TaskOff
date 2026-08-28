import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { Loader } from "lucide-react";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="grid place-items-center w-full min-h-dvh">
      <div className="flex flex-col gap-4 items-center">
      <Loader className="animate-spin"/>
      <p className="text-muted text-sm animate-pulse">Authentication...</p>
      </div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children
}

export default ProtectedRoute;
