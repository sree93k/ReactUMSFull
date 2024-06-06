
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const adminAddUser = () => {

  const [formData,setFormData]=useState({})
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const notify = (err) => toast(err);

 const handleChange=((e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
 })

 useEffect(()=>{
  document.title="UMS Admin"

  return ()=>{document.title=""}
},[])

 const handleSubmit=async(e)=>{
  e.preventDefault()

console.log("formData is >>>>!!@@@" , formData);
console.log("step0");
  try {
      setLoading(true)
      setError(false)
      const res=await fetch('/server/admin/createUser',{
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
      console.log("step log 1");
      if(data.success===false)
      {
        console.log("sign up error is",data.message);
        if(data.message==="Internal Server Error")
        {
            notify("Account Already Exists")
        }
        else
        {
            notify(data.message)
        }
      
          setError(true)
          return;
      }
      console.log("step log 2");
      navigate('/admin/dashboard')
  } catch (error) {
      setLoading(false)
      setError(true)
      console.log("error is sign up",error);
  }
 }


  return (
    <div className='relative w-full h-screen'>

      <div className='relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg '>
        <h1 className='text-3xl text-center font-semibold my-7'>Create New User</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
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
            className='bg-slate-700 text-white p-3 mt-10 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' 
          >
           Create Account
          </button>
        <Link to='/admin/dashboard' className=''>
        <button 
            className='bg-red-700  text-white p-3 mt-1 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-100' 
          >
          Cancel
          </button>
          </Link>
        </form>
       
      </div>
      <ToastContainer 
      position='top-center'
      theme='dark'
      transition={Bounce}/>
    </div>
  )
}

export default adminAddUser
