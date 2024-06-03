import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/admin/adminSlice'; 

const adminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentAdmin} = useSelector((state) => state.admin);
  console.log("currnt admin Home page",currentAdmin);
const handleDashboard=()=>{
  navigate('/admin/dashboard')
}
const handleLogout = () => {
  dispatch(signOut());
  navigate('/admin/signin');
};
  return (
    <div className='relative h-screen'>
    <div className="relative mt-20 z-10 p-0 max-w-lg mx-auto flex items-center justify-center  bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-full w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Home</h1>
        <h2 className="text-xl font-semibold mb-6">Welcome, <span className='text-lg uppercase'>{currentAdmin?currentAdmin.adminname:""}</span></h2>
        <button onClick={handleDashboard} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600">
          Dashboard
        </button>
        <img src={currentAdmin?currentAdmin.profilePicture:"Profile Picture"} alt="Profile" className="mx-auto mb-4 w-24 h-24 rounded-full border-2 border-gray-300" />
        <h4 className="text-lg font-medium mb-2"> Name : <span className='text-lg uppercase'>{currentAdmin?currentAdmin.adminname:""}</span></h4>
        <h4 className="text-lg font-medium mb-2"> Email : {currentAdmin?currentAdmin.email:""}</h4>
        
        <button onClick={handleLogout}  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
    {/* </div> */}
    </div>
    </div>
  )
}

export default adminHome
