import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function AlumniRegister() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",

    role: "student",

    graduation_year: "",
    department: "",
    company: "",
    job_title: "",
    location: "",
  });

  const handleRegister = async () => {

    try {

      await API.post(
        "/auth/register",
        form
      );

      toast.success(
        "Registration successful"
      );

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Registration
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

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
          className="w-full border p-3 rounded mb-4"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >

          <option value="student">
            Student
          </option>

          <option value="alumni">
            Alumni
          </option>

        </select>

        {/* Alumni Fields */}
        {form.role === "alumni" && (

          <>

            <input
              type="number"
              placeholder="Graduation Year"
              className="w-full border p-3 rounded mb-4"
              value={form.graduation_year}
              onChange={(e) =>
                setForm({
                  ...form,
                  graduation_year: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Department"
              className="w-full border p-3 rounded mb-4"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Company"
              className="w-full border p-3 rounded mb-4"
              value={form.company}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Job Title"
              className="w-full border p-3 rounded mb-4"
              value={form.job_title}
              onChange={(e) =>
                setForm({
                  ...form,
                  job_title: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full border p-3 rounded mb-4"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />

          </>

        )}

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm">

          Already have an account?

          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() =>
              window.location.href = "/"
            }
          >
            Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default AlumniRegister;