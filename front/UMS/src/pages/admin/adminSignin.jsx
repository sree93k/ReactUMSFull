import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import  {signInStart,signInSuccess,signInFailure} from '../../redux/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSignin = () => {

  const [formData,setFormData]=useState({})
   const {currentAdmin,isLogged,error}=useSelector((state)=>state.admin)
   const navigate=useNavigate()
   const dispatch=useDispatch()
   

    useEffect(()=>{
      if(isLogged===true)
      {
        navigate('/admin/home')
      }
    },[])


    useEffect(()=>{
      document.title="UMS Admin"

      return ()=>{document.title=""}
    },[])


    const notify = (error) => toast(error);

    useEffect(() => {
      if (error) {
          dispatch(signInFailure(null));
      }
  }, [dispatch]);

    const handleChange=((e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
     })

     const handleSubmit=async(e)=>{
      console.log("handle submitted step 1");
      e.preventDefault()
      console.log("form datad is",formData);
      if(!formData.email || !formData.password)
      {
        notify("Inputs Cannot be empty")
        return
      }
      try {
        console.log("handle submitted step 2");
          dispatch(signInStart())
          
          const res=await fetch('/server/adminAuth/signin',{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(formData)
          })
          const data=await res.json()
          console.log("the data in sign admin",data);
        
          if(data.success===false)
          {
            console.log("step false");
            notify(data.message)
              dispatch(signInFailure(data))
              
              return;
          }
         
          dispatch(signInSuccess(data))
          console.log("routing to /home from signin");
          navigate('/admin/home')
      } catch (error) {
        console.log("handle submitted error 1");
        console.log("signin error >>@@@####",error);
          dispatch(signInFailure(error))
      }
     }

  return (
    <div className='relative h-screen'>

      <div className='relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg'>
        <h1 className='text-3xl text-center font-semibold my-7'>Admin Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input 
           onChange={handleChange}
            type="email" 
            placeholder='Email' 
            id='email' 
            className='bg-slate-100 p-3 rounded-lg'
          />
          <input 
           onChange={handleChange}
            type="password" 
            placeholder='Password' 
            id='password' 
            className='bg-slate-100 p-3 rounded-lg'
          />
          <button 
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Sign In
          </button>
        </form>
      
      </div>
      <ToastContainer 
      position='top-center'
      theme='dark'
      transition={Bounce}/>
    
    </div>
  );
}

export default AdminSignin;
