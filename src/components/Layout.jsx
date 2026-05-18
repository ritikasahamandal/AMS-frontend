import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">

        <h1 className="text-2xl font-bold mb-10">
          AMS Admin
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">

          <Link
            to="/admin"
            className="hover:bg-blue-800 p-3 rounded transition"
          >
            Dashboard
          </Link>

          <Link
            to="/add-alumni"
            className="hover:bg-blue-800 p-3 rounded transition"
          >
            Add Alumni
          </Link>

          <Link
            to="/search-alumni"
            className="hover:bg-blue-800 p-3 rounded transition"
          >
            Search Alumni
          </Link>

          <Link
            to="/send-email"
            className="hover:bg-blue-800 p-3 rounded transition"
          >
            Send Email
          </Link>

        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-auto bg-red-500 hover:bg-red-600 p-3 rounded transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Topbar */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">

          <h2 className="text-2xl font-semibold">
            Alumni Management System
          </h2>

        </div>

        {/* Page Content */}
        {children}

      </div>
    </div>
  );
}

export default Layout;