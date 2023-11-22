import React from 'react'
import { Outlet} from 'react-router-dom';


function GamePlayLayout() {
  return (
    <div 
      className='h-[100vh]  bg-black bg-center bg-no-repeat bg-cover relative'
      style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/studio168/bg.png'})`}}
    >
      <Outlet/>


    </div>
  )
}

export default GamePlayLayout