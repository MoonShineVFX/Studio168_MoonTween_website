import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { Joystick } from 'react-joystick-component';
import { database } from '../../firebase';
import { onValue, ref,child, push, update,set,orderByChild,equalTo,query } from "firebase/database";
function Index({title}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mail = searchParams.get('mail');
  const navigate = useNavigate();
  const [ move ,setMove] = useState('')
  const [ moveX ,setMoveX] = useState(0)
  const [ moveY ,setMoveY] = useState(0)
  const [ characterX ,setCharacterX] = useState(0)
  const [ characterY ,setCharacterY] = useState(0)
  const [projects, setProjects] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const handleMove =(e)=>{
    console.log('move')
    console.log(e.direction)
    setMove(e.direction)
    if(e.direction === 'RIGHT'){
      setCharacterX(characterX+1)
      // writeUserX(moveX+1)
    }else if(e.direction === 'LEFT'){
      setCharacterX(characterX-1)
      // writeUserX(moveX-1)
    }else if(e.direction === 'FORWARD'){
      setCharacterY(characterY-1)
      // writeUserY(moveY-1)
    }else if(e.direction === 'BACKWARD'){
      setCharacterY(characterY+1)
      // writeUserY(moveY+1)
    }
  }
  const handleStop =()=>{
    console.log('stop')
    // setCharacterX(0)
    // setCharacterY(0)
  }

  useEffect(() => {
    if(mail){
      const userData = query(ref(database, 'PlayerDatas'),orderByChild('Email'),equalTo(mail))
      return onValue(userData, (snapshot) =>{
        const data = snapshot.val();
        console.log(data)
        if(!data){
          navigate('/joystick')
          return
        }
        setCurrentUserId( Object.keys(snapshot.val())[0])
        // 
        snapshot.forEach(function (childSnapshot) {
          var value = childSnapshot.val();
          console.log(value)
          setCurrentUser(value)
        })
       
      })
    }

  }, []);

  if(!mail) {
    return <div className='flex flex-col justify-center items-center py-10'>
      沒有讀取到資料或查無
    </div>
  }
  const writeUserX = (x)=>{
    update(ref(database, `PlayerDatas/${currentUserId}`), {
      DeltaX: x,
    });
  }
  const writeUserY = (y)=>{
    update(ref(database, `PlayerDatas/${currentUserId}`), {
      DeltaY: y,
    });
  }

  return (
    <div>
      <div className='fixed z-10 bottom-24 left-0 w-1/3'>
        <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_btn_passport.png" alt="" />
      </div>
      <div className='flex flex-col'>
        <Header 
          title="數位分身控制器" 
          subtitle={`- 使用<span class='text-[#61a9a5]'>控制器</span>來操作您的分身進行互動吧！ -`} 
        />
        <div className='flex flex-col justify-center items-center h-1/2 my-4'>
          <div className='mt-12 -mb-8 relative w-3/5'> 
            <div className='w-24 ml-14 mb-3'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_tap_text.png" alt="" />
            </div> 
            <button 
              className=' w-24 flex justify-center items-center text-white '
              onClick={()=>writeUserX(0)}
            >
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_tap_btn.png" alt="" />
            </button>
          </div>
          <div className=' relative '> 
            <div className='w-24 ml-auto mb-3'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_swipe_text.png" alt="" />
            </div> 
            <Joystick 
              size={250} 
              sticky={false} 
              baseImage="https://moonshine.b-cdn.net/msweb/studio168/controller_swipe_range.png"
              stickColor="#62a9a5" 
              stickSize={55}
              move={handleMove} 
              stop={handleStop}>
              
            </Joystick>
          </div>

        </div>
        <div className='test fixed top-1/3 left-0'>
          測試數據：
          <div>1. 移動方向 {move}</div>
          <div>2. 角色位置X {characterX}</div>
          <div>3. 角色位置Y {characterY}</div>
          {projects &&
            (
              <div className='mt-10'>
                現在的使用者：
                <div>firebase_Key:{currentUserId}</div>
                <div>Email:{currentUser.Email}</div>
                <div>DeltaX:{currentUser.DeltaX}</div>
                <div>DeltaY:{currentUser.DeltaY}</div>
              </div>
            )
          }
        </div>

        <div 
          className={' fixed z-20 w-5 h-5 bg-red-700 rounded-full'}
          style={{ transform: `translate(${characterX}px, ${characterY}px)` }}
          >

        </div>
        
      </div>
    </div>

  )
}

export default Index