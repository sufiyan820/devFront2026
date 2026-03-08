import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post("/api/admins/register", {
        username,
        email,
        password
      });

      alert("Admin registered successfully!");
      // optionally, redirect to login page
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
      alert("Failed to register admin");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white shadow-md rounded w-80">
        <h2 className="text-xl mb-4 text-center">Admin Register</h2>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={register}
          className="bg-black text-white w-full p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
