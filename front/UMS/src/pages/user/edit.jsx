import React ,{useState,useEffect,useRef}from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserStart,deleteUserSuccess,deleteUserFailure,signOut } from '../../redux/user/userSlice'
import Swal from 'sweetalert2'

const edit = () => { const [image,setImage]=useState(undefined)
  const [imagePercent,setImagePercent]=useState(0)
  const [imageError,setImageError]=useState(false)
  const [formData,setFormData]=useState({})
  const fileRef=useRef(null)
  const dispatch=useDispatch()
  const {currentUser,loading, error}=useSelector((state)=>state.user)    
  const [updateSuccess,setUpdateSuccess]=useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
    setFormData({
      username: currentUser.username,
      email: currentUser.email,
      profilePicture: currentUser.profilePicture
   });
  }
  }, [currentUser]);

  const handleChange = (e) => {
    console.log("set form Dtata",formData,e.target.value);
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log("hello");
    try {
      dispatch(updateUserStart())
      console.log("The form data is",formData);
      const res=await fetch(`/server/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data=await res.json()
      console.log("data ststus",data);
      if(data.success===false)
      {
        dispatch(updateUserFailure(data))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }

  const handleChangePassword = () => {
    navigate('/user/resetPassword'); // Assuming this navigates to the password change page
  };

  const handleBackButton=()=>{
    navigate('/user/home');
  }

  const handleDeleteAccount=async()=>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteConfirmed=async()=>{
          try {
            dispatch(deleteUserStart())
            console.log("delete success 0");
            const res=await fetch(`/server/user/delete/${currentUser._id}`,{
              method:'DELETE',
            })
            const data=await res.json()
            console.log("delete success 1",data);
            if(data.success===false)
            {
              dispatch(deleteUserFailure(data))
              return
            }
            console.log("delete success 2");
            dispatch(deleteUserSuccess(data))
            navigate('/user/signin')
          } catch (error) {
            dispatch(deleteUserFailure(error))
          }
        }
        deleteConfirmed()
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
    
  }

  return (
    <div className='relative h-screen'>
      <div className='relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg text-center'>
        <button onClick={handleBackButton}
         className='bg-blue-700 text-white p-1 rounded-lg uppercase hover:opacity-95 w-half'
        >Back</button>
        <h1 className='text-3xl font-semibold my-7'>Edit Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
    

        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/>
        <img onClick={()=>fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture} alt="profile" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'/>
        <p className='text-sm self-center'>
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


        </p>
          <input 
             value={formData.username}
             type="text"  
             name="username"
             placeholder='Name'
             className='bg-slate-100 p-3 rounded-lg'
             onChange={handleChange}
          />
          <input 
               value={formData.email}
               type="text" 
               name="email"
               placeholder='Email' 
               className='bg-slate-100 p-3 rounded-lg'
               onChange={handleChange}
          />
          <button 
            type='submit'
            className='bg-slate-700 text-white p-3 mt-3 rounded-lg uppercase hover:opacity-95 w-full'
          >
            {loading? 'Loading...' : 'Update Profile'}
          </button>
        </form>
      
        <button 
          onClick={handleChangePassword}
          className='bg-red-600 text-white mb-3 p-3 rounded-lg uppercase hover:opacity-95 w-full mt-4'
        >
          Need to change password?
        </button>

        <span onClick={handleDeleteAccount} className='text-red-700  cursor-pointer'>Delete Account</span>
      </div>
    </div>
  )
}

export default edit
