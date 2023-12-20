import React from 'react'
import Header from '../../Components/Header'
import { Link,useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from "react-qr-code";
function Passport({ isOpen, onClose, appStatus,currentUser,lineUserData,encryptUid,encryptResult,isModeldata ,liffCloseWindow}) {
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
          {currentUser?.Status === 'ready' && 
            <div onClick={onClose}  className=' absolute right-0 p-3'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/passport_btn_close.png?width=26" alt="" className=' ' />
            </div>
          }

          <div className='flex flex-col justify-center items-center my-16'>

            <div className='w-[150px]'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/joystick_logo.png" alt="" />
            </div>


            
            
            {isModeldata ?
              <div 
                className='p-3 mt-6 bg-contain bg-no-repeat w-11/12 mx-auto drop-shadow-[8px_5px_7px_rgba(98,169,165,0.15)]'
                style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/studio168/passport_qr2_bg.png?width=400'})`}}
              >
                {encryptResult.length >0 &&
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={lineUserData && encryptResult}
                  viewBox={`0 0 256 256`}
                />
                }

              </div> 
            :
              <div 
                className='p-3 mt-8 bg-contain bg-no-repeat w-11/12 aspect-square mx-auto drop-shadow-[8px_5px_7px_rgba(98,169,165,0.15)]'
                style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/studio168/passport_qr2_bg.png?width=400'})`}}
              >
                    <div class="sysMsg">
                      <div class="text-center text-[#7A8E8B] text-lg font-bold ">系統查無數位分身</div>
                      <div class="text-center text-[#7A8E8B] font-bold">可能是因為</div>
                      <div class="mt-4 px-4">
                        <li class="text-[#7A8E8B] text-xs">未進行 - 數位分身掃描</li>
                        <div class="text-[#62A9A5] text-xs pl-4 my-2">前往數位分身掃瞄區，完成掃描吧！</div>
                        <li class="text-[#7A8E8B] text-xs mt-4">已進行 - 數位分身掃描</li>
                        <div class="text-[#62A9A5] text-xs pl-4 my-2">數位分身正在建立中，請等候完成！</div>
                        
                      </div>
                      <button className=' rounded-lg bg-[#62A9A5] w-full mt-2 py-1 text-white' onClick={liffCloseWindow} >OK</button>

                      

                    </div>
                
              </div> 
            }
            {/* {appStatus?.status !== 'default' && <div className='mt-4 text-black/70 text-sm '>{appStatus?.msg}</div> } */}
          </div>

        </motion.div>
      </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default Passport