import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = () => {

    const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='bg-blue-950'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-blue-600'>Welcome Mr. SREEKUTTAN</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>SREEKUTTAN</li>
          </Link>
          {/* <Link to='/'>
            <li>About</li>
          </Link>
            {currentUser ? (
              <Link to='/'>
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
              </Link>
            ) : (
              <Link to='/signin'>
                <li>Sign In</li>
              </Link>
             
            )} */}

                <li>
                {['Success'].map(
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
      )}
                </li>
 
            
      
        </ul>
      </div>
    </div>
  )
}

export default Header
