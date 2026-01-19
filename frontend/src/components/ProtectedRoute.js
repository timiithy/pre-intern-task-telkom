import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") || "user";

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
        if (!allowedRoles.includes(role)) {
            return <Navigate to="/login" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
