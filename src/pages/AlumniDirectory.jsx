import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AlumniDirectory() {

  const [alumni, setAlumni] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    company: "",
    department: "",
    year: "",
  });

  // Fetch Alumni
  const fetchAlumni = async () => {

    try {

      const res = await API.get("/alumni");

      setAlumni(res.data.data || res.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load alumni");

    }
  };

  // Search Alumni
  const handleSearch = async () => {

    try {

      const query =
        new URLSearchParams(filters).toString();

      const res = await API.get(
        `/alumni/search?${query}`
      );

      setAlumni(res.data);

    } catch (error) {

      console.error(error);

      toast.error("Search failed");

    }
  };

  useEffect(() => {

    fetchAlumni();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 pt-32 px-4 md:px-10">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">

        <div className="max-w-7xl mx-auto px-4 md:px-10">

          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-red-800"
            >
              AlumniMS
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-4 md:gap-8">

              {/* Home */}
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Home
              </Link>

              {/* Current Page */}
              <Link
                to="/alumni-directory"
                className="text-blue-600 font-semibold"
              >
                Alumni Directory
              </Link>

              {/* My Profile */}
              <Link
                to={
                  localStorage.getItem("role") === "admin"
                    ? "/admin"
                    : localStorage.getItem("role") === "student"
                      ? "/student"
                      : "/alumni"
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition text-sm md:text-base"
              >
                My Profile
              </Link>

            </div>

          </div>

        </div>

      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">

        <h1 className="text-3xl md:text-5xl font-bold mb-3">

          Alumni Directory

        </h1>

        <p className="text-gray-600 text-base md:text-lg">

          Connect with alumni from different
          departments, companies and batches.

        </p>

      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">

          Search & Filter

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Company"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                company: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Department"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                department: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Graduation Year"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setFilters({
                ...filters,
                year: e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={handleSearch}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Search Alumni
        </button>

      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {alumni.map((a) => (

          <div
            key={a.id}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
          >

            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl mb-5">

              🎓

            </div>

            {/* Name */}
            <h3 className="text-2xl font-bold mb-2 break-words">

              {a.name}

            </h3>

            {/* Details */}
            <p className="text-gray-600 mb-1 break-words">
              {a.company}
            </p>

            <p className="text-gray-600 mb-1 break-words">
              {a.job_title}
            </p>

            <p className="text-gray-600 mb-1 break-words">
              {a.department}
            </p>

            <p className="text-gray-600 mb-1 break-words">
              {a.location}
            </p>

            <p className="text-gray-600 mb-4">

              Batch:
              {" "}
              {a.graduation_year}

            </p>

            {/* ADMIN CONTROLS */}
            {localStorage.getItem("role") === "admin" && (

              <div className="flex flex-wrap gap-3 mt-5">

                {/* Verify */}
                <button
                  onClick={() => handleVerify(a.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
                >
                  Verify
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(a)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                >
                  Delete
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default AlumniDirectory;