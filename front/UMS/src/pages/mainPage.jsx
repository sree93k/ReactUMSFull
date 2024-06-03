import React,{useEffect} from 'react'

import './mainPage.css'
const mainPage = () => {
  useEffect(()=>{
    document.title="UMS React"

    return ()=>{document.title=""}
  },[]) 
  return (
    
    <div className='relative w-full h-screen flex flex-col items-center '>

      <div className='relative mt-3 z-10 p-3 max-w-lg mx-auto bg-white bg-opacity-75 rounded-lg '>
        <h1 className='text-3xl text-center font-semibold my-7'>Welcome To The World Of React</h1>
        </div>
        
      </div>
  )
}

export default mainPage
