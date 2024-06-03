import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';
import Swal from 'sweetalert2'

const passwordEdit = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [formData,setFormData]=useState({})
  const {currentUser} = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }  

 const handleResetPassword = async(e) => {
          e.preventDefault();
          console.log("hello");
          try {
            console.log("step 1");
            dispatch(updateUserStart())
            console.log("user id is",currentUser);
            const res=await fetch(`/server/user/updatePassword/${currentUser._id}`,{
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
      
            Swal.fire({
              title: "Password Updated Successfully",
              icon:"success",
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector('b');
                if (b) {
                  const timerInterval = setInterval(() => {
                    b.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
                  Swal.getHtmlContainer().addEventListener('willClose', () => {
                    clearInterval(timerInterval);
                  });
                }
              }
            });
            navigate('/user/home')
          } catch (error) {
            console.log("error is",error);
            dispatch(updateUserFailure(error))
          }
        };
      

  const handleCancel = () => {
    navigate('/user/home'); 
  };

  return (
    <div className='relative h-screen'>
  
      <div className='relative z-10 mt-3 p-5 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
        <h1 className='text-3xl font-semibold my-7'>Password Reset</h1>
        <form onSubmit={handleResetPassword} className='flex flex-col gap-4'>
        
       
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

export default passwordEdit
