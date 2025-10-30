import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { Container, Card,Row,Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from  '../assets/icon.jpg'
import tick from '../assets/tick.jpg'
import axios from 'axios';
import { useParams } from 'react-router-dom';


function orderComplete() {
  const [roomData,setRoomData] =useState('');
  const [bookingData, setBookingData] = useState('');
   const[days,setDays]=useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchInvoice = async () => {
      const bookingId = localStorage.getItem("bookingId");
      if (!bookingId) {
      console.error("No booking ID found in localStorage");
      return;
    }
      try {
        const res = await axios.get(`http://localhost:3000/api/bookings/${bookingId}`);
        const data = res.data;
        setBookingData(data.booking);
        setRoomData(data.room);

        const fromDate = new Date(data.booking.from);
        const toDate = new Date(data.booking.to);
        const diffTime = toDate - fromDate;
        const diffDays = diffTime / (1000 * 3600 * 24);
        setDays(diffDays);

    } catch (err) {
        console.error('Failed to fetch invoice data:', err.message);
      }
    };

    fetchInvoice();
  }, []);


  return (
    
    <Container fluid className="container" style={{fontfamily:'san-serif', maxWidth:'450px',
                                             height: '100vh', padding: 0, position: 'relative'}}>
                          <div className=' d-flex justify-content-between'><span className='top'><ArrowLeft style={{ cursor: 'pointer',color:'#ffff'}} onClick={() => navigate(-1)} /></span>
                          <h1 className='text'>GenX Villa</h1>
                          <span><img src={icon} alt='icon' className='icon' ></img></span></div>
    
        <div className='wrapper'  style={{fontfamily:'inter', maxWidth:'450px',
                                       height: '100vh', padding: 0, position: 'relative'}}>
                          
                <Card className="p-3 m-4 shadow-sm" style={{ borderRadius: '10px', marginBottom: '20px',position:'relative',bottom:'30px' }}>
                 <Row className="justify-content-between align-items-center">
          <Col>
          <div>Room  <span className="fw-semibold">0{roomData.id}</span>  </div>
            <div>
              Customers Id: <span className="fw-semibold">{bookingData.id}</span>
            </div>
          </Col>
          <Col className="text-end">
            <div className="fw-bold text-dark">{roomData.type} Room</div>
            <div>
              Days: <span style={{color:'red'}}>0{days}</span>
            </div>
          </Col>
        </Row>
      </Card>
      
      <div>
        <img src={tick} style={{marginLeft:'60px', position:'relative',left:'60px',top:'10px'}}></img>
      </div>
      <div className='text-center' style={{marginLeft:'18px', position:'relative',top:'60px', marginBottom:'150px'}}><h1>Your order is completed succesfully</h1></div>
      <hr></hr>
      <div className='mx-5'>
      <Button className=' w-100 p-3' style={{backgroundColor:'#008CA4',borderRadius:'50px',border:'#008CA4'}}>Book Now</Button>
      </div> 
    

      </div>
      </Container>
  )
}

export default orderComplete