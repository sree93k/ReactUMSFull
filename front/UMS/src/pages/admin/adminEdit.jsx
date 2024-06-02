import React from 'react'
import { useSelector } from 'react-redux'

const adminEdit = () => {
  const {currentAdmin}=useSelector((state)=>state.admin)
  return (
    <div className='relative h-screen'>
    <div className='relative z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg'>
      admin edit {currentAdmin.adminname}
    </div>
    </div>
  )
}

export default adminEdit
