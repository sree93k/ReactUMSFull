import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundVideo from '../../../public/mainBg.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/user/userSlice'; 

const home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleEditProfile = () => {
      navigate('/user/editprofile');
    };
  
    const handleLogout = () => {
      dispatch(signOut());
      navigate('/user/signin');
    };
  return (
    <div className='relative h-screen'>
    <video autoPlay loop muted className='absolute inset-0 w-full h-full object-cover'>
      <source src={backgroundVideo} type='video/mp4' />
    </video>
    <div className='relative z-10 p-5 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
      <h1 className='text-3xl font-semibold my-7'>Welcome to my website</h1>
      <img src="" alt="Profile" className='mx-auto mb-4 w-32 h-32 rounded-full object-cover' />
      <div className='text-left'>
        <h3 className='text-lg font-medium'>Name:</h3>
        <h3 className='text-lg font-medium'>Email:</h3>
        <h3 className='text-lg font-medium'>Mobile:</h3>
      </div>
      <button 
        onClick={handleEditProfile} 
        className='bg-slate-700 text-white p-3 my-3 rounded-lg uppercase hover:opacity-95 w-full'
      >
        Edit Profile
      </button>
      <br />
      <br />
      <button 
        onClick={handleLogout} 
        className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full'
      >
        Logout
      </button>
    </div>
  </div>
  )
}

export default home
