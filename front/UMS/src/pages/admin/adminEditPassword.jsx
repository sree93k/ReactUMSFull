import React from 'react'
import { useNavigate } from 'react-router-dom';

const adminEditPassword = () => {
    const navigate = useNavigate();
   
      
        const handleResetPassword = (e) => {
          e.preventDefault();
        };
      
        const handleCancel = () => {
          navigate('/admin/home'); 
        };
  return (
    <div className='relative h-screen'>
  
      <div className='relative z-10 mt-3 p-5 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
        <h1 className='text-3xl font-semibold my-7'>Password Reset</h1>
        <form onSubmit={handleResetPassword} className='flex flex-col gap-1'>
          <label htmlFor='email' className='text-lg font-medium text-left'>Email ID</label>
          <input 
            type="email" 
            id='email'
            placeholder='Enter your email'
            className='bg-slate-100 p-3 rounded-lg'
          />
          <label htmlFor='new-password' className='text-lg font-medium text-left'>New Password</label>
          <input 
            type="password" 
            id='new-password'
            placeholder='Enter New Password' 
            className='bg-slate-100 p-3 rounded-lg'
          />
          <label htmlFor='re-enter-password' className='text-lg font-medium text-left'>Re-enter Password</label>
          <input 
            type="password" 
            id='re-enter-password'
            placeholder='Re-enter the Password' 
            className='bg-slate-100 p-3 rounded-lg'
          />
          <button 
            type='submit'
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full'
          >
            Reset Password
          </button>
          <button 
            type='button'
            onClick={handleCancel}
            className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full mt-4'
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default adminEditPassword
