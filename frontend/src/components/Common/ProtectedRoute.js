import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

  // belum login
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // role tidak diizinkan
  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    // redirect sesuai role
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === "user") {
      return <Navigate to="/dashboard-user" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
