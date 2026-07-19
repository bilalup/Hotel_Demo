import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PageLoader } from "../ui/PageLoader";

export function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  if (requireAdmin && user?.role !== "admin") return <Navigate to="/admin" replace />;

  return children;
}
