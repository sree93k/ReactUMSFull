import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../../firbase.js'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleGoogleClick=async()=>{
        console.log("step google 1");
        try {
            console.log("step google 2");
        const provider=new GoogleAuthProvider()
        const auth=getAuth(app)

        const result=await signInWithPopup(auth,provider)
        const res=await fetch('/server/auth/google',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL,
        })
        })
        const data=await res.json()
        console.log("the google data is >>>>>>",data);
        console.log();
        dispatch(signInSuccess(data))
        console.log("success google");
        navigate('/user/home')
        } catch (error) {
            console.log("step google error");
            console.log("could not login with google",error);
        }

    }
  return (
   
      <button type='button' 
      onClick={handleGoogleClick} 
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
        Continue with Google</button>
   
  )
}

export default OAuth
