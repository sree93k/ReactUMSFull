
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { signOut } from '../../redux/admin/adminSlice'

const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const {currentAdmin}=useSelector((state)=>state.admin)
    console.log("current Admin details",currentAdmin);
    console.log("currentAdmin is >>@@##$$",currentAdmin);


    useEffect(() => {
      console.log("currentUser in header is", currentAdmin);
    }, [currentAdmin]);
    const handleSignOut=async()=>{
      try {
        await fetch('/server/adminAuth/signout')
        dispatch(signOut())
        console.log("admin sign out header");
        navigate('/admin/signin')
      } catch (error) {
        console.log(error);
      }
    }
   
  return (
    <div className='bg-slate-900'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {currentAdmin==null?(
            <Link to='/'>
            <h1 className='font-bold text-blue-600'>Welcome To Admin Portal</h1>
          </Link>
        ):(
         <Link to='/admin/home'>
         <h1 className='font-bold text-blue-600'>Welcome  {currentAdmin?currentAdmin.adminname:""}</h1>
       </Link>
        )}
        <ul className='flex gap-4'>

                <li>
                  {currentAdmin?(
                    ['Success'].map(
                      (variant) => (
                        <DropdownButton
                          as={ButtonGroup}
                          key={variant}
                          id={`dropdown-variants-${variant}`}
                          variant={variant.toLowerCase()}
                          title={"Profile"}
                        >
                          <Dropdown.Item eventKey="1" onClick={handleSignOut}>Logout</Dropdown.Item>
                          
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
                          title={"Login"}
                        >
                          <Dropdown.Item eventKey="1"><Link to='/user/signin'>User Sign In</Link></Dropdown.Item>
                          <Dropdown.Item eventKey="2"><Link to='/admin/signin'>Admin Sign In</Link></Dropdown.Item>
                          
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
