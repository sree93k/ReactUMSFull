import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/admin/adminSlice'; 

const adminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const handleDashboard=()=>{
  navigate('/admin/dashboard')
}
const handleLogout = () => {
  dispatch(signOut());
  navigate('/admin/signin');
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Home</h1>
        <h2 className="text-xl font-semibold mb-6">Welcome, SREEKUTTAN</h2>
        <button onClick={handleDashboard} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600">
          Dashboard
        </button>
        <img src="" alt="Profile" className="mx-auto mb-4 w-24 h-24 rounded-full border-2 border-gray-300" />
        <h4 className="text-lg font-medium mb-2">Admin Name: Sreekuttan</h4>
        <h4 className="text-lg font-medium mb-2">Admin Email: sree@gmail.com</h4>
        <h4 className="text-lg font-medium mb-6">Mobile: 1234567890</h4>
        <button onClick={handleLogout}  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  )
}

export default adminHome
