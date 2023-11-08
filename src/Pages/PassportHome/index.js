import React from 'react'
import Header from '../../Components/Header'
import { Link,useLocation } from 'react-router-dom';

function Passport() {
  return (
    <div>
      <div className='flex flex-col'>
        <Header 
          title="歡迎來到數位分行" 
          subtitle={`- 將<span class='text-[#61a9a5]'>通行證</span>對準掃瞄器即可將分身匯入<span class='text-[#61a9a5]'>數位分行</span> -`} 
        />
        <div 
          className='w-10/12 mx-auto bg-contain aspect-[992/1676] bg-no-repeat bg-center relative'
          style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/studio168/passport_bg.png?width=450'})`}}
        >
          <Link to="/joeystick?id=" className=' absolute right-0 p-3'>
            <img src="https://moonshine.b-cdn.net/msweb/studio168/passport_btn_close.png?width=26" alt="" className=' ' />
          </Link>
          <div className='flex flex-col justify-center items-center mt-[85px]'>
            <div className='w-20 p-1'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/user_a.png" alt="" className='  rounded-2xl' />
            </div>
            <div className='w-52 mt-20'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/1200px-QR_Code_Example.svg.png" alt="" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Passport