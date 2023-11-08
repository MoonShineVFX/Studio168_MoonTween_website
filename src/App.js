import { BrowserRouter , Routes, Route,useNavigate} from 'react-router-dom';
import GamePlayLayout from './Layouts/GamePlayLayout';
import JoyStickHome from './Pages/JoystickHome'
import Passporthome from './Pages/PassportHome'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamePlayLayout />} > 
         <Route path="" element={<Passporthome />} />

          <Route path="joystick" element={<JoyStickHome />} />
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;