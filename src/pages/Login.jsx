import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();   // ✅ using AuthContext properly
  const navigate = useNavigate();

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE FORM SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/auth/login/user",
        formData
      );

      // ✅ If backend returns { token: "jwtTokenHere" }
      const token = res.data.token || res.data;

      if (!token) {
        throw new Error("Token not received from server");
      }

      // ✅ Save token in localStorage
      localStorage.setItem("token", token);

      // ✅ Update AuthContext state
      login(token);

      toast.success("Login successful!");
      navigate("/");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = () => {
    window.location.href =
      "http://16.171.170.96:8080/oauth2/authorization/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-4xl font-extrabold">
            Sign in to your account
          </h2>
          <p className="text-center text-sm">
            Or{" "}
            <Link to="/register" className="text-blue-600">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border p-2 rounded"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;