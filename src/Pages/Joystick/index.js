import React, { useState, useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom';
import { Joystick } from 'react-joystick-component';
import { database } from '../../firebase';
import { onValue, ref,child, push, update,set } from "firebase/database";
function Index() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [ move ,setMove] = useState('')
  const [ characterX ,setCharacterX] = useState(0)
  const [ characterY ,setCharacterY] = useState(0)
  const [projects, setProjects] = useState([]);
  const handleMove =(e)=>{
    console.log('move')
    console.log(e.direction)
    setMove(e.direction)
    if(e.direction === 'RIGHT'){
      setCharacterX(characterX+1)
      writeUserX(characterX+1)
    }else if(e.direction === 'LEFT'){
      setCharacterX(characterX-1)
      writeUserX(characterX-1)
    }else if(e.direction === 'FORWARD'){
      setCharacterY(characterY-1)
      writeUserY(characterY-1)
    }else if(e.direction === 'BACKWARD'){
      setCharacterY(characterY+1)
      writeUserY(characterY+1)
    }
  }
  const handleStop =()=>{
    console.log('stop')
  }
  useEffect(() => {
    const query = ref(database, `PlayerDatas/${id}`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setProjects(data)
     
    });
  }, []);


  const writeUserX = (x)=>{
    update(ref(database, `PlayerDatas/${id}`), {
      DeltaX: x,
    });
  }
  const writeUserY = (y)=>{
    update(ref(database, `PlayerDatas/${id}`), {
      DeltaY: y,
    });
  }
  return (
    <div 
      className="mx-auto w-full md:max-w-xl h-screen bg-center bg-no-repeat bg-cover" 
      style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/studio168/bg.png'})`}}
    >
      <div className='flex flex-col'>
        <div className='flex justify-center items-center flex-col my-12'>
          <div className='text-3xl tracking-wider  text-[#61a9a5] font-extrabold'>數位分身控制器</div>
          <div className='text-[#788d88] my-2'>- 使用 <span className='text-[#61a9a5]'>控制器</span> 來操作您的分身進行互動吧！ -</div>
        </div>
        <div className='flex flex-col justify-center items-center h-1/2 my-4'>
          <div className='my-10 relative w-3/5'>
            <div className='w-3/4 ml-auto mb-3'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_tap_text.png" alt="" />
            </div>
            <button 
              className=' w-28 flex justify-center items-center text-white '
              onClick={()=>writeUserX(0)}
            >
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_tap_btn.png" alt="" />
            </button>
          </div>

          <Joystick 
            size={200} 
            sticky={false} 
            baseImage="https://moonshine.b-cdn.net/msweb/studio168/controller_swipe_range.png"
            stickColor="#62a9a5" 
            stickSize={55}
            move={handleMove} 
            stop={handleStop}>
            
          </Joystick>
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
                <div>Email:{projects.Email}</div>
                <div>DeltaX:{projects.DeltaX}</div>
                <div>DeltaY:{projects.DeltaY}</div>
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