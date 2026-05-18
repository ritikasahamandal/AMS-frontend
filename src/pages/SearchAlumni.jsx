import { useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function SearchAlumni() {

  const [filters, setFilters] = useState({
    name: "",
    company: "",
    year: "",
    department: "",
  });

  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {

      const query = new URLSearchParams(filters).toString();

      const res = await API.get(`/alumni/search?${query}`);

      setResults(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>

      {/* Search Box */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Search Alumni
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search by name"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Company"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({ ...filters, company: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Graduation Year"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({ ...filters, year: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Department"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          />

        </div>

        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">
            Results
          </h2>
        </div>

        <table className="w-full">

          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Department</th>
              <th className="p-4">Company</th>
              <th className="p-4">Year</th>
            </tr>
          </thead>

          <tbody>
            {results.length > 0 ? (
              results.map((alumni) => (
                <tr
                  key={alumni.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">{alumni.name}</td>
                  <td className="p-4">{alumni.email}</td>
                  <td className="p-4">{alumni.department}</td>
                  <td className="p-4">{alumni.company}</td>
                  <td className="p-4">
                    {alumni.graduation_year}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </Layout>
  );
}

export default SearchAlumni;