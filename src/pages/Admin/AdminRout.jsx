import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  const role = localStorage.getItem("role");

  if (!adminToken || role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
