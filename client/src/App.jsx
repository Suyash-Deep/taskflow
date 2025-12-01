import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = !!localStorage.getItem("taskflow-token");

  const handleLogout = () => {
    localStorage.removeItem("taskflow-token");
    localStorage.removeItem("taskflow-user");
    window.location.href = "/"; // redirect to login
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        {!isLoggedIn ? (
          <>
            <Link to="/" style={{ marginRight: 10 }}>
              Login
            </Link>
            <Link to="/register" style={{ marginRight: 10 }}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={{ marginRight: 10 }}>
              Dashboard
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
