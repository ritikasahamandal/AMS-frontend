import React, { useState, useEffect } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function AdminDashboard() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    try {

      const res = await API.get("/admin/users");

      setUsers(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  const deleteUser = async (id) => {

    try {

      await API.delete(`/admin/user/${id}`);

      fetchUsers();

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <Layout>

      {/* Page Heading */}
      <div className="mb-8">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">

          Admin Dashboard

        </h1>

        <p className="text-gray-600 mt-2">

          Manage students, alumni and platform users.

        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <p className="text-gray-500 text-sm mb-2">

            Total Users

          </p>

          <h2 className="text-4xl font-bold text-blue-600">

            {users.length}

          </h2>

        </div>

        {/* Alumni */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <p className="text-gray-500 text-sm mb-2">

            Alumni

          </p>

          <h2 className="text-4xl font-bold text-green-600">

            {
              users.filter(
                (u) => u.role === "alumni"
              ).length
            }

          </h2>

        </div>

        {/* Students */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

          <p className="text-gray-500 text-sm mb-2">

            Students

          </p>

          <h2 className="text-4xl font-bold text-purple-600">

            {
              users.filter(
                (u) => u.role === "student"
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b">

          <h2 className="text-2xl font-semibold">

            Users

          </h2>

        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="bg-blue-100 text-left text-sm md:text-base">

                <th className="p-4 whitespace-nowrap">
                  Name
                </th>

                <th className="p-4 whitespace-nowrap">
                  Email
                </th>

                <th className="p-4 whitespace-nowrap">
                  Role
                </th>

                <th className="p-4 whitespace-nowrap">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {users.length > 0 ? (

                users.map((u) => (

                  <tr
                    key={u.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-4 whitespace-nowrap">
                      {u.name}
                    </td>

                    <td className="p-4 whitespace-nowrap text-sm md:text-base">
                      {u.email}
                    </td>

                    <td className="p-4 capitalize whitespace-nowrap">

                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">

                        {u.role}

                      </span>

                    </td>

                    <td className="p-4 whitespace-nowrap">

                      <button
                        onClick={() => deleteUser(u.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center p-8 text-gray-500"
                  >

                    No users found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );
}

export default AdminDashboard;