import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from 'react-js-search';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const notify = (err) => toast(err);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/server/admin/allUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const allUsers = await res.json();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();

    return () => {
      localStorage.removeItem('userImages');
    };
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admin/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      // Deleting logic
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleVerified = async (userId, currentStatus) => {
    try {
      // Toggle verified status logic
    } catch (error) {
      notify(error.message);
    }
  };

  const handleOnSearch = (term, hits) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(hits);
    }
  };
  
  return (
    <div className='relative h-screen'>
      <div className="relative z-10 mt-4 mx-auto align-middle items-center justify-center bg-white shadow-lg rounded-lg p-4 max-w-4xl w-full overflow-auto">
        <div className='mx-auto align-middle flex justify-between'>
          <div style={{ width: '200px' }}>
            <SearchBar 
              onSearchTextChange={(term, hits) => handleOnSearch(term, hits)}
              placeHolderText="Search here..."
              data={users}
            />
          </div>
      
          <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
          <Link to='/admin/addUser'>
            <button
              className="flex items-center px-4 py-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-extrabold text-lg rounded-full shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-70 active:bg-blue-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className="w-8 h-8 mr-4 -ml-2 text-white animate-pulse"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
              Add New User
            </button>
          </Link>
        </div>

        <Table striped bordered hover className="min-w-full">
          <thead>
            <tr>
              <th className='text-center align-middle'>SI NO</th>
              <th className='text-center align-middle'>Name</th>
              <th className='text-center align-middle'>Email ID</th>
              <th className='text-center align-middle'>Image</th>
              <th className='text-center align-middle'>Verified</th>
              <th className='text-center align-middle'>Edit</th>
              <th className='text-center align-middle'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td className='text-center align-middle'>{index + 1}</td>
                <td className='align-middle'>{user.username}</td>
                <td className='align-middle'>{user.email}</td>
                <td className='text-center align-middle'>
                  <img className='w-16 h-16 object-cover' src={user.profilePicture || "profile picture"} alt="" />
                </td>
                <td className='text-center align-middle'>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.verified}
                      onChange={() => handleToggleVerified(user._id, user.verified)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-white-800 rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </td>
                <td className='align-middle'>
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
                <td className='align-middle'>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ToastContainer 
        position='top-center'
        theme='dark'
        transition={Bounce}
      />
    </div>
  );
};

export default AdminDashboard;
