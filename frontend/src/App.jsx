import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './Components/home';
import Room from './Components/room';
import CustomerInformation from './Components/CustomerInformation.jsx'
import InVoice from './Components/InVoice.jsx';
import OrderComplete from './Components/OrderComplete.jsx';

function App() {
 
  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element= { <Home />} />
        <Route path="/room/:id" element= { <Room />} />
        <Route path="/customerinformation/:id" element= { <CustomerInformation />} />
        <Route path="/invoice/:id" element= { <InVoice />} />
        <Route path="/ordercomplete/:id" element= { <OrderComplete />} />
        </Routes>
        </Router>
    </>
  )
}

export default App
