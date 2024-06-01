import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../../../public/mainBg.mp4';

const edit = () => {
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    // Add logic to handle profile update
  };

  const handleChangePassword = () => {
    navigate('/user/resetPassword'); // Assuming this navigates to the password change page
  };

  const handleBackButton=()=>{
    navigate('/user/home');
  }
  return (
    <div className='relative h-screen'>
      <video autoPlay loop muted className='absolute inset-0 w-full h-full object-cover'>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
      <div className='relative z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
        <button onClick={handleBackButton}
         className='bg-blue-700 text-white p-1 rounded-lg uppercase hover:opacity-95 w-half'
        >Back</button>
        <h1 className='text-3xl font-semibold my-7'>Edit Profile</h1>
        <form onSubmit={handleUpdate} className='flex flex-col gap-2'>
          <img src="" alt="Profile" className='mx-auto mb-4 w-32 h-32 rounded-full object-cover' />
          <input 
            type="file" 
            className='bg-slate-100 p-3 rounded-lg'
          />
          <input 
            type="text"  
            placeholder='Name'
            className='bg-slate-100 p-3 rounded-lg'
          />
          <input 
            type="text" 
            placeholder='Email' 
            className='bg-slate-100 p-3 rounded-lg'
          />
          <button 
            type='submit'
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full'
          >
            Update
          </button>
        </form>
      
        <button 
          onClick={handleChangePassword}
          className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full mt-4'
        >
          Need to change password?
        </button>
      </div>
    </div>
  )
}

export default edit
