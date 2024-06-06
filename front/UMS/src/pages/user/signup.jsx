import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../../components/OAuth'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const signup = () => {
  const [formData,setFormData]=useState({})
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const notify = (err) => toast(err);

  useEffect(()=>{
    document.title="UMS User"

    return ()=>{document.title=""}
  },[])

 const handleChange=((e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
 })

 const handleSubmit=async(e)=>{
  e.preventDefault()

console.log("formData is >>>>!!@@@" , formData);
if(!formData.email || !formData.password || !formData.username)
      {
        notify("Inputs Cannot be empty")
        return
      }
console.log("step0");
  try {
      setLoading(true)
      setError(false)
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
      let timerInterval;
        Swal.fire({
          title: "Account created Successfully",
          icon:"Success",
          timer: 800,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      navigate('/user/signin')
  } catch (error) {
      setLoading(false)
      setError(true)
      console.log("error is sign up",error);
  }
 }

  return (
   <div className='relative w-full h-screen'>

      <div className='relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg '>
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
      <ToastContainer 
      position='top-center'
      theme='dark'
      transition={Bounce}/>
    </div>
  )
}

export default signup
