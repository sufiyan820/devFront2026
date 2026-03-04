import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <- use this to redirect

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/uadmin/login", {
        username,
        password
      });

      // Save token & role
      localStorage.setItem("adminToken", res.data);
      localStorage.setItem("role", "ADMIN");

      // ✅ Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white shadow-md rounded w-80">
        <h2 className="text-xl mb-4 text-center">Admin Login</h2>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={login}
          className="bg-black text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
