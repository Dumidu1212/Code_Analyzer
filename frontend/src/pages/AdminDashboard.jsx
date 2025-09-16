// src/pages/AdminDashboard.jsx

import { useState, useEffect } from 'react';
import api from '../utils/api';
import Header from '../components/Header';
import NavbarAdmin from '../components/NavbarAdmin';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get('/auth/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/auth/deleteuser/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <NavbarAdmin />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="mt-6">
          <h3 className="text-xl font-bold">Users</h3>
          <ul className="mt-4">
            {users.map((user) => (
              <li key={user._id} className="border p-4 mt-2">
                {user.userName} ({user.email})
                <Link
                  to={`/deleteuser/${user._id}`}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete User
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
