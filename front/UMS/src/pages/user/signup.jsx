import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../../components/OAuth'
import backgroundVideo from '../../../public/mainBg.mp4'


const signup = () => {
  const [formData,setFormData]=useState({})
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
 const handleChange=((e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
 })
 const handleSubmit=async(e)=>{
  e.preventDefault()
console.log("formData is >>>>!!@@@" , formData);
console.log("step0");
  try {
      // setLoading(true)
      // setError(false)
      const res=await fetch('/server/auth/signup',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
      })
      console.log("step1");
      const data=await res.json()
      console.log("step2");
      console.log("data is",data)
      setLoading(false)
      if(data.success===false)
      {
          setError(true)
          return;
      }
      navigate('/user/signin')
  } catch (error) {
      setLoading(false)
      setError(true)
      console.log("error is sign up",error);
  }
 }

  return (
   <div className='relative w-full h-screen'>
      <video autoPlay loop muted className='absolute inset-0 w-full h-full object-cover'>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
      <div className='relative z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg '>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input 
            type="text" 
            placeholder='User Name' 
            id='username' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input 
            type="email" 
            placeholder='Email' 
            id='email' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input 
            type="password" 
            placeholder='Password' 
            id='password' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <button 
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' 
          >
            Sign Up
          </button>
          <OAuth/>
        </form>
        <div className='flex gap-2 mt-5'>
        <p>Have an Account ?</p>
        <Link to='/signin'>
        <span 
        className='text-blue-500'
        >Sign In</span>
        </Link>
        
     </div>
      </div>
    </div>
  )
}

export default signup