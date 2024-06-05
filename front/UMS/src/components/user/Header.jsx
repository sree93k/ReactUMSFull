import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { signOut } from '../../redux/user/userSlice'; 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log("current user details", currentUser);


  const handleSignOut = async () => {
    try {
      console.log("step 1");
      await fetch('/server/auth/signout');
      console.log("step 2");
      dispatch(signOut());
      console.log("step 3");
      navigate('/user/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-slate-900'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {currentUser === null ? (
          <Link to='/'>
            <h1 className='font-bold text-red-600'>MERN Stack</h1>
          </Link>
        ) : (
          <Link to='/user/home'>
            <h1 className='font-bold text-red-600'>Welcome To React World</h1>
          </Link>
        )}

        <ul className='flex gap-4'>
          <li>
            {currentUser === null ? (
              ['Success'].map((variant) => (
                <DropdownButton
                  as={ButtonGroup}
                  key={variant}
                  id={`dropdown-variants-${variant}`}
                  variant={variant.toLowerCase()}
                  title={"Login"}
                >
                  <Dropdown.Item eventKey="1">
                    <Link to='/user/signin'>User Sign In</Link>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">
                    <Link to='/admin/signin'>Admin Sign In</Link>
                  </Dropdown.Item>
                </DropdownButton>
              ))
            ) : (
              <div className='relative'>
                <Dropdown>
                  <Dropdown.Toggle as='div' className='flex flex-col justify-center items-center cursor-pointer'>
                    <div className='flex items-center cursor-pointer'> 
                    <img src={currentUser.profilePicture} alt="Profile" className='w-8 h-8 rounded-full' />
                    <svg className="w-4 h-4 ml-0 fill-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                    </div>
                    <div className='mt-1'>
                    <span className='text-white'>Me</span>
                    </div>
                   
                    
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg'>
                    <Dropdown.Item eventKey="1">
                      <Link to='/user/home'>Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={handleSignOut}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
