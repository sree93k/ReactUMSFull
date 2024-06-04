import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import backgroundVideo from '../../../public/mainBg.mp4';
import  {signInStart,signInSuccess,signInFailure} from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../../components/OAuth'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {

  const [formData,setFormData]=useState({})
   const {currentUser,loading,error}=useSelector((state)=>state.user)
   const navigate=useNavigate()
    const dispatch=useDispatch()
    const notify = (error) => toast(error);




    useEffect(()=>{
      document.title="UMS User"

      return ()=>{document.title=""}
    },[]) 
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
      
      try {
        console.log("handle submitted step 2");
          dispatch(signInStart())
          
          const res=await fetch('/server/auth/signin',{
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(formData)
          })
          const data=await res.json()
          console.log("the data ",data);
          if(data.success===false)
          {
            console.log("failure sign in");
            console.log("new error",error)
            error?notify("Invalid Input"):notify("Account Not Found")
            // notify()
              dispatch(signInFailure(data))
              return;
          }
          console.log("success sign in");
          dispatch(signInSuccess(data))
          console.log("routing to /home from signin");
          navigate('/user/home')
      } catch (error) {
        console.log("signin submitted error 1");
          toast(error)
          dispatch(signInFailure(error))
      }
     }
  return (
    <div className='relative h-screen'>

      <div className='relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          <button disabled={loading}
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' 
          >
            {loading?'Loading...':'Sign In'}
          </button>
          <OAuth/>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Create an Account?</p>
          <Link to='/user/signup'>
            <span className='text-blue-500'>Sign Up</span>
          </Link>
        </div>
      </div>
      <ToastContainer 
      position='top-center'
      theme='dark'
      transition={Bounce}/>
    </div>
  );
};

export default Signin;
