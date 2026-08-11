import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Guards /admin/* — waits for the auth check to finish before deciding,
// so a logged-in admin doesn't get bounced during the initial page load.
const ProtectedRoute = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="page-wrapper text-center py-5">লোড হচ্ছে...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
