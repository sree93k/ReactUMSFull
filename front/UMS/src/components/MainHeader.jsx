import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = () => {
    const {currentUser}=useSelector((state)=>state.user)
  return (

  <header class="pb-6 bg- lg:pb-0  bg-gradient-to-r from-purple-900 to-blue-900">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

        <nav class="flex items-center justify-between h-16 lg:h-20">
            <div class="flex-shrink-0 align-middle justify-center gap-3">
                <a href="#" title="" class="flex">
                <div class="flex-col gap-4 w-full flex items-center justify-center">
                  <div class="w-18 h-18 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">  
                    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" class="animate-ping">
                      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                    </svg>
                  </div>
                </div>
                 <div>
                    <Link to='/' className='text-decoration-none'>
                  <h3 className='font-bold text-white '>ReactJS</h3>
                </Link>
                 </div>
                </a>
            </div>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      
      
      </div>

      <ul className='flex gap-4' >
                <li>
                {['Primary'].map(
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

                <li>
                  
                  
                </li>
        </ul>
        
        </nav>

    </div>
</header>
  )
}

export default Header
