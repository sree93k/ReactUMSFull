import React,{useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { signOut } from '../../redux/user/userSlice'; 

const Header = () => {
   const dispatch=useDispatch()
   const navigate=useNavigate()
    const {currentUser}=useSelector((state)=>state.user)
    console.log("currebt user details",currentUser);

    useEffect(()=>{
      console.log("currentUser in header is",currentUser);
    },[currentUser])

    const handleSignOut=async()=>{
      try {
        console.log("step 1");
        await fetch('/server/auth/signout')
        console.log("step 2");
        dispatch(signOut())
        console.log("step 3");
        navigate('/user/signin');
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='bg-slate-900'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {currentUser===null?(
          <Link to='/'>
          <h1 className='font-bold text-red-600'>MERN Stack </h1>
        </Link>
        ):(
          <Link to='/user/home'>
          <h1 className='font-bold text-red-600'>Welcome To React World</h1>
        </Link>
        )}
        
        <ul className='flex gap-4'>
         
                <li>
                  {currentUser===null?(
                  

                    ['Success'].map(
                      (variant) => (
                        <DropdownButton
                          as={ButtonGroup}
                          key={variant}
                          id={`dropdown-variants-${variant}`}
                          variant={variant.toLowerCase()}
                          title={"Login"}
                        >
                          <Dropdown.Item eventKey="1"><Link  to='/user/signin'>User Sign In</Link></Dropdown.Item>
                          <Dropdown.Item eventKey="2"><Link  to='/admin/signin'>Admin Sign In</Link></Dropdown.Item>
                          
                        </DropdownButton>
                      ),
                    )
                  ):(
                    ['Success'].map(
                      (variant) => (
                        <DropdownButton
                          as={ButtonGroup}
                          key={variant}
                          id={`dropdown-variants-${variant}`}
                          variant={variant.toLowerCase()}
                          title={"Logout"}
                        >
                           <Dropdown.Item eventKey="1"><Link  to='/user/home'><button>Profile</button></Link></Dropdown.Item>
                          <Dropdown.Item eventKey="1"><button onClick={handleSignOut}>Logout</button></Dropdown.Item>
                          
                          
                        </DropdownButton>
                      ),
                    )

                  )}
                
                </li>
      
        </ul>
      </div>
    </div>
  )
}

export default Header
