import React, { useState, useEffect } from 'react'
import { Joystick } from 'react-joystick-component';
import { database } from '../../firebase';
import { onValue, ref } from "firebase/database";
function Index() {
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
    }else if(e.direction === 'LEFT'){
      setCharacterX(characterX-1)
    }else if(e.direction === 'FORWARD'){
      setCharacterY(characterY-1)
    }else if(e.direction === 'BACKWARD'){
      setCharacterY(characterY+1)
    }
  }
  const handleStop =()=>{
    console.log('stop')
  }
  useEffect(() => {
    const query = ref(database, "PlayerDatas");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setProjects((projects) => [...projects, project]);
        });
      }
    });
  }, []);
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center items-center flex-col h-1/2'>
        <div className='text-xl'>Title</div>
        <div className=''>subtitle</div>
      </div>
      <div className='flex flex-col justify-center items-center h-1/2 my-4'>
        <div className=' rounded-full bg-slate-500 w-14 h-14 p-2 flex justify-center items-center text-white'>button</div>
        <Joystick size={200} sticky={false} baseColor="red" stickColor="blue" move={handleMove} stop={handleStop}></Joystick>
      </div>
      <div className='test'>
        測試數據：
        <div>1. 移動方向 {move}</div>
        <div>2. 角色位置X {characterX}</div>
        <div>3. 角色位置Y {characterY}</div>
      </div>
      <div 
        className={' fixed z-20 w-5 h-5 bg-red-700 rounded-full'}
        style={{ transform: `translate(${characterX}px, ${characterY}px)` }}
        >

      </div>
      
    </div>
  )
}

export default Index