import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const adminEdit = () => {
  const {currentAdmin}=useSelector((state)=>state.admin)
  const navigate=useNavigate()

const handleChangePassword=()=>{
  navigate('/admin/changepassword')
}

const handleBackButton=()=>{
  navigate('/admin/dashboard')
}
  return (
    <div className='relative h-screen'>
      <div className='relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
        <button onClick={handleBackButton}
         className='bg-blue-700 text-white p-1 rounded-lg uppercase hover:opacity-95 w-half'
        >Back</button>
        <h1 className='text-3xl font-semibold my-7'>Edit Profile</h1>
        <form className='flex flex-col gap-2'>
    
          <img  alt="profile" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'/>
        {/* <p className='text-sm self-center'>
        {imageError ? (
          <span className='text-red-700'>Error Uploading Image(file size must be less than 2MB)</span>
        ) : (
          imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-blue-700'>{`Uploading: ${imagePercent}%`}</span>
          ) : (
            imagePercent === 100 && (
              <span className='text-green-700'>Image Uploaded Successfully</span>
            )
          )
        )}

        </p> */}
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

export default adminEdit
