import React from 'react'
import Header from '../../Components/Header'
import { Link,useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
function Passport({ isOpen, onClose, appStatus,currentUser,lineUserData}) {
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      translateX:"-50%",
      translateY:"-50%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      translateX:"-50%",
      translateY:"-50%",
      transition: {
        type: 'spring',
        damping: 10,
      },
    },
  };
  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div 
        className='flex  fixed top-0 bottom-0 left-0 right-0 z-50 bg-black/20'
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div 
          className='w-10/12 px-6 mx-auto bg-contain aspect-[992/1676] bg-no-repeat bg-top absolute top-1/2 left-1/2'
          variants={modalVariants}
          style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/studio168/passport_bg.png?width=400'})`}}
        >
          {currentUser?.Status === 'done' && 
            <div onClick={onClose}  className=' absolute right-0 p-3'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/passport_btn_close.png?width=26" alt="" className=' ' />
            </div>
          }

          <div className='flex flex-col justify-center items-center mt-[15px]'>
            <div className='text-[#61a9a5]  text-2xl border-b border-white pb-2 mb-3 w-full  text-center'>
              通行證 PASSPORT
            </div>
            <div className='w-20 p-1 border rounded-2xl border-white mt-7'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/user_a.png" alt="" className='  rounded-2xl' />
            </div>
            <div 
              className='p-4 mt-10 bg-contain bg-no-repeat w-11/12 mx-auto drop-shadow-[8px_5px_7px_rgba(98,169,165,0.15)]'
              style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/studio168/passport_qr2_bg.png?width=400'})`}}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/1200px-QR_Code_Example.svg.png" alt="" />
            </div>
            {appStatus?.status !== 'default' && <div className='mt-3'>{appStatus?.msg}</div> }
            {lineUserData?.sub !== 'default' && <div className='mt-3'>{lineUserData?.sub}{lineUserData?.name}</div> }
          </div>

        </motion.div>
      </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default Passport