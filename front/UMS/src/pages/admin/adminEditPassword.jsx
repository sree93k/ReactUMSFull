import React,{useEffect, useState} from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';

const adminEditPassword = () => {
    const navigate = useNavigate();
    const [formData,setFormData]=useState({})
    const { userId } = useParams(); 
    const dispatch=useDispatch()


    const handleChange = (e) => {
      setFormData({...formData,[e.target.id]:e.target.value})
    } 
      useEffect(()=>{
        console.log("user idsssss",userId);
      })
        const handleResetPassword = async(e) => {
          e.preventDefault();
          console.log("hello");
          try {
            dispatch(updateUserStart())
            console.log("user id is",userId);
            const res=await fetch(`/server/admin/updatePassword/${userId}`,{
              method:'PUT',
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify(formData)
            })
            const data=await res.json()
            console.log("data ststus",data);
            if(data.success===false)
            {
              console.log("error");
              dispatch(updateUserFailure(data))
              return;
            }
            console.log("yes 1");
            dispatch(updateUserSuccess(data))
      
            console.log("admin passowrd resett sucess");
            navigate('/admin/dashboard')
          } catch (error) {
            dispatch(updateUserFailure(error))
          }
        };
      
        const handleCancel = () => {
          navigate('/admin/dashboard'); 
        };
  return (
    <div className='relative h-screen'>
  
      <div className='relative z-10 mt-3 p-5 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
        <h1 className='text-3xl font-semibold my-7'>Password Reset</h1>
        <form onSubmit={handleResetPassword} className='flex flex-col gap-3'>
   
        
          <input 
            type="password" 
            id='new_password'
            placeholder='Enter New Password' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
        
          <input 
            type="password" 
            id='re_enter_password'
            placeholder='Re-enter the Password' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
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
