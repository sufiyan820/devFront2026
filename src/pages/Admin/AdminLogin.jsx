import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {

      const res = await axios.post("/api/auth/login/admin", {
        email: email,
        password: password
      });

      // save token
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("role", "ADMIN");

      // redirect
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
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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