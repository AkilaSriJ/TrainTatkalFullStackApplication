
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import AvailableTrains from './components/AvailableTrains'
import  UserInformation from './components/userInformation';
import Class from './components/class';
import Booking from './components/Booking';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {

  return (
    <>
       <BrowserRouter>
          <Routes>
            
              <Route path="/" element= { <Home />} />
              <Route path="/availabletrains/:trainId" element={<AvailableTrains />} />
             <Route path="/userinformation/:trainId/:coachId" element={<UserInformation />} /> 
             <Route path="/class/:trainId/:coachId/:passengerId" element={<Class />} />
             <Route path ="/booking/:trainId/:coachId/:passengerId/:bookingId"element={<Booking />} />
              
          </Routes>
       </BrowserRouter>
       
    </>
  )
}

export default App
