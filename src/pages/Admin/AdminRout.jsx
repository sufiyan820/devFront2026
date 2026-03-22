 import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
} 