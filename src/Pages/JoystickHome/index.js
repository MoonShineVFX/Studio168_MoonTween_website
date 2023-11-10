import React, { useState, useEffect } from 'react'
import liff from '@line/liff';
import Header from '../../Components/Header';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { Joystick } from 'react-joystick-component';
import { database } from '../../firebase';
import { onValue, ref,child, push, update,set,orderByChild,equalTo,query } from "firebase/database";
import PassportModal from '../PassportHome';
import { functions } from "../../firebase";
import { httpsCallable } from "firebase/functions";
function Index({title}) {
  const liffID = process.env.REACT_APP_LIFF_JOYSTICK_ID
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const [appStatus , setAppStatus] = useState({
    status:"default",
    msg:""
  })
  const [ move ,setMove] = useState('')
  const [ moveX ,setMoveX] = useState(0)
  const [ moveY ,setMoveY] = useState(0)
  const [ characterX ,setCharacterX] = useState(0)
  const [ characterY ,setCharacterY] = useState(0)
  const [projects, setProjects] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [lineUserData, setLineUserData] = useState({})
  const mail = searchParams.get('mail') ?  searchParams.get('mail') :  lineUserData.email ;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isInteract, setIsInteract] = useState(0);
  const init=async()=>{
    try {
      await liff.init({liffId: liffID}).then(()=>{
        if (!liff.isLoggedIn()){
          setLineUserData({
            name:"未知的",
            email:"xxx@mail.com",
            picture:"https://moonshine.b-cdn.net/msweb/studio168/user_a.png?width=200",
            sub:"none"
          })
          setAppStatus({
            status: "fail",
            msg: "請從 Line 登入此頁面，再進行操作。"
          })
        }else{
          const user = liff.getDecodedIDToken();
          setLineUserData(user)
          encryptUid(user.sub)
        }
      })

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    init()
  },[])
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleMove =(e)=>{
    setMoveX(e.x)   
    setMoveY(e.y)
    writeUserXY(e.x,e.y)
  }
  const handleStop =()=>{
    setMoveX(0)   
    setMoveY(0)
    writeUserXY(0,0)

  }
  const handleInteract =()=>{
    setIsInteract(1)
    writeUserInteract(1)

    setTimeout(() => {
      setIsInteract(0);
      writeUserInteract(0)
    }, 500);
  }
  useEffect(() => {
    if (isModalOpen && lineUserData.email === currentUser.Email) {
      setIsTimerRunning(true);
      setAppStatus({
        status: "scan",
        msg: "請靠近機台進行掃描，並等待資料建立。"
      })
      const id = setInterval(() => {
        // 每三秒执行的操作
        console.log('每三秒执行一次的操作');
        fetchUserData()
      }, 3000);
      setIntervalId(id);
    }else{
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isModalOpen,lineUserData]);
  //      
  // <Header 
  //   title="歡迎來到數位分行" 
  //   subtitle={`- 將<span class='text-[#61a9a5]'>通行證</span>對準掃瞄器即可將分身匯入<span class='text-[#61a9a5]'>數位分行</span> -`} 
  // />
  const fetchUserData = () =>{
    if(mail){
      const userData = query(ref(database, 'PlayerDatas'),orderByChild('Email'),equalTo(mail))
      return onValue(userData, (snapshot) =>{
        const data = snapshot.val();
        console.log(data)
        if(!data){
          setIsModalOpen(true)
          setAppStatus({
            status: "miss",
            msg: "角色資料不存在! 請掃描以進行操作。"
          })
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
  }
  useEffect(() => {
    fetchUserData()

  }, [lineUserData]);

  const writeUserXY = (x,y)=>{
    update(ref(database, `PlayerDatas/${currentUserId}`), {
      DeltaX: x,
      DeltaY: y
    });
  }
  const writeUserInteract=(num)=>{
    update(ref(database, `PlayerDatas/${currentUserId}`), {
      IsInteract:num
    });
  }

  // if(!mail) {
  //   return <div className='flex flex-col justify-center items-center py-10'>
  //     沒有讀取到資料或查無
  //   </div>
  // }
  const [encryptResult, setEncryptResult] = useState('')
  const encryptUid = async(text)=>{
    try {
      const encryptFunction = httpsCallable(functions, "encrypt");
      const result = await encryptFunction(text)
      console.log(result.data)
      setEncryptResult(result.data)



    } catch (error) {
      console.log(error) 
    }
  }





  return (
    <div>
      <PassportModal isOpen={isModalOpen} onClose={handleCloseModal} appStatus={appStatus} currentUser={currentUser} lineUserData={lineUserData} encryptUid={encryptUid}  encryptResult={encryptResult} />
      <div className='fixed z-10 bottom-24 left-0 w-1/3' onClick={handleOpenModal} >
        <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_btn_passport.png" alt="開啟通行證" />
      </div>
      <div className='flex flex-col'>
        <Header 
          title="數位分身控制器" 
          subtitle={`- 使用<span class='text-[#61a9a5]'>控制器</span>來操作您的分身進行互動吧！ -`} 
        />
        <div className='flex flex-col justify-center items-center h-1/2 my-4'>
          
          <div className='mt-12 -mb-8 relative w-3/5'> 
            <div className='w-24 ml-14 mb-3'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_tap_text.png" alt="點擊互動" />
            </div> 
            <button 
              className=' w-24 flex justify-center items-center text-white '
              onClick={handleInteract}
            >
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_tap_btn.png" alt="互動按鈕" />
            </button>
          </div>
          <div className=' relative '> 
            <div className='w-24 ml-auto mb-3'>
              <img src="https://moonshine.b-cdn.net/msweb/studio168/controller_swipe_text.png" alt="滑動控制" />
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
        <div className='test fixed top-1/3 left-0 pointer-events-none'>
          測試數據：
          <div>1. 移動方向 {move}</div>
          <div>2. 移動位置X {moveX}</div>
          <div>3. 移動位置Y {moveY}</div>

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

        
      </div>
    </div>

  )
}

export default Index