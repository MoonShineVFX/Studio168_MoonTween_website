import React from 'react'

function Header({title,subtitle}) {
  return (
    <div className='flex justify-center items-center flex-col mt-8 mb-4'>
      <div className='text-3xl tracking-wider  text-[#61a9a5] font-extrabold'>{title}</div>
      <div 
        className='text-[#788d88] my-2'
        dangerouslySetInnerHTML={{__html: subtitle}}
      >
      </div>
    </div>
  )
}

export default Header