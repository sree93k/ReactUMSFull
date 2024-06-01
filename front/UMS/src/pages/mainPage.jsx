import React from 'react'
import backgroundVideo from '../../public/mainBg.mp4'
const mainPage = () => {
    console.log(backgroundVideo)
  return (
    
    <div >
      <video autoPlay loop muted id='video'>
        <source src={backgroundVideo} type='video/mp4'/>
      </video>
    </div>
  )
}

export default mainPage
