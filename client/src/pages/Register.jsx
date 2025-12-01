import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register response:", res.data);

      alert("Registered successfully! Now log in.");
      navigate("/"); // go to login
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>TaskFlow - Register</h2>

      {error && (
        <p style={{ color: "red", marginBottom: 10 }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%" }}
            required
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
}

export default Register;
