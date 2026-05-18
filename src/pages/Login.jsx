import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const handleLogin = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      toast.success("Login successful");

      // Role based navigation
      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      }

      else if (res.data.user.role === "student") {
        window.location.href = "/student";
      }

      else if (res.data.user.role === "alumni") {
        window.location.href = "/alumni";
      }

    } catch (error) {

      console.error(error);

      const message =
        error.response?.data?.message;

      toast.error(
        message || "Login failed"
      );

      // Redirect only if account doesn't exist
      if (message === "User not found") {

        if (form.role === "student") {

          setTimeout(() => {
            window.location.href =
              "/register/student";
          }, 1500);

        }

        else if (form.role === "alumni") {

          setTimeout(() => {
            window.location.href =
              "/register/alumni";
          }, 1500);

        }
      }
    }
  };

  // Register button navigation
  const handleRegister = () => {

    if (form.role === "student") {
      window.location.href =
        "/register/student";
    }

    else if (form.role === "alumni") {
      window.location.href =
        "/register/alumni";
    }

    else {
      toast.error(
        "Admin registration is not allowed"
      );
    }
  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md mx-4">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* Role */}
        <select
          className="w-full border p-3 rounded mb-6"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >

          <option value="admin">
            admin
          </option>

          <option value="student">
            Student
          </option>

          <option value="alumni">
            Alumni
          </option>

        </select>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
          >
            Login
          </button>

          <button
            onClick={handleRegister}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white p-3 rounded"
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;