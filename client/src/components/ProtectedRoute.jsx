import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("taskflow-token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
