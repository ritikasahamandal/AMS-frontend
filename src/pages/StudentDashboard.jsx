import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function StudentDashboard() {

  const [alumni, setAlumni] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    company: "",
    course_name: "",
    graduation_year: "",
  });

  // Fetch all alumni
  const fetchAlumni = async () => {

    try {

      const res = await API.get(
        "/alumni"
      );

      setAlumni(res.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load alumni"
      );
    }
  };

  // Search alumni
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

      toast.error(
        "Search failed"
      );
    }
  };

  useEffect(() => {

    fetchAlumni();

  }, []);

  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  return (

    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-full md:w-72 bg-blue-900 text-white p-6 flex flex-col shadow-xl">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">

          Student Portal

        </h1>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-4">

          <div className="bg-blue-800 p-4 rounded-xl font-medium">

            👥 Alumni Directory

          </div>

          <div className="bg-blue-800 p-4 rounded-xl font-medium">

            🔍 Search Alumni

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-6 md:mt-auto bg-red-500 hover:bg-red-600 p-4 rounded-xl font-semibold transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">

        {/* Header */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow mb-8">

          <h2 className="text-3xl md:text-4xl font-bold mb-3">

            Student Dashboard

          </h2>

          <p className="text-gray-600 text-base md:text-lg">

            Explore and connect with alumni

          </p>

        </div>

        {/* Search Filters */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow mb-8">

          <h3 className="text-2xl md:text-3xl font-semibold mb-6">

            Search Alumni

          </h3>

          {/* Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
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
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  company: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Course Name"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  course_name: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Graduation Year"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  graduation_year: e.target.value,
                })
              }
            />


          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            Search
          </button>

        </div>

        {/* Alumni Directory */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow">

          <h3 className="text-2xl md:text-3xl font-semibold mb-8">

            Alumni Directory

          </h3>

          {/* Alumni Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {alumni.map((a) => (

              <div
                key={a.id}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition"
              >

                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl mb-5">

                  🎓

                </div>

                {/* Name */}
                <h4 className="text-xl md:text-2xl font-bold mb-2 break-words">

                  {a.name}

                </h4>
                <p className="text-blue-600 font-medium mb-2 break-words">
                  {a.course_name}
                </p>

                {/* Details */}
                <p className="text-gray-600 mb-1 break-words">
                  {a.company}
                </p>

                <p className="text-gray-600 mb-1 break-words">
                  {a.job_title}
                </p>

                <p className="text-gray-600 mb-1 break-words">
                  {a.location}
                </p>

                <p className="text-gray-600">

                  Graduation Year:
                  {" "}
                  {a.graduation_year}

                </p>

              </div>

            ))}
            <div className="mt-3">

              {a.is_approved ? (

                <span className="text-green-600 font-semibold">
                  ✅ Verified
                </span>

              ) : (

                <span className="text-yellow-600 font-semibold">
                  ⏳ Pending Verification
                </span>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;