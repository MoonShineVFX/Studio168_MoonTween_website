import { BrowserRouter , Routes, Route,useNavigate} from 'react-router-dom';
import JoyStickHome from './Pages/Joystick'
function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<JoyStickHome />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;