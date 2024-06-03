import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundVideo from '../../../public/mainBg.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/user/userSlice'; 

const home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user);
    console.log("home page cureent user",currentUser);

    const handleEditProfile = () => {
      navigate('/user/editprofile');
    };
  
    // const handleLogout =async () => {
    //   try {
    //     await fetch('/server/auth/signout')
    //     dispatch(signOut())
    //     navigate('/user/signin');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  return (
    <div className='relative h-screen'>
    <div className='relative mt-3 z-10 p-5 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
      <h1 className='text-3xl font-semibold my-7'>Profile Details</h1>
      <img src={currentUser.profilePicture} alt="Profile" className='mx-auto mb-4 w-32 h-32 rounded-full object-cover' />
      <div className='text-left'>
        <h3 className='text-lg font-medium'>Name:{currentUser?currentUser.username:""}</h3>
        <h3 className='text-lg font-medium'>Email:{currentUser?currentUser.email:""}</h3>
       
      </div>
      <button 
        onClick={handleEditProfile} 
        className='bg-slate-700 text-white p-3 my-3 rounded-lg uppercase hover:opacity-95 w-full'
      >
        Edit Profile
      </button>
      <br />
      <br />
      {/* <button 
        onClick={handleLogout} 
        className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full'
      >
        Logout
      </button> */}
    </div>
  </div>
  )
}

export default home
