import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { Container, Card,Row,Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from  '../assets/icon.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const inVoice = () => {
    const [roomData,setRoomData] =useState(null);
    const [bookingData, setBookingData] = useState(null);
    const[days,setDays]=useState(0);
    const [cgst, setCgst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [total, setTotal] = useState(0);

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
        const diffDays = (toDate-fromDate) / (1000 * 3600 * 24);
        setDays(diffDays);

        const subtotal = data.room.price * diffDays;
        const cgstAmount = 4000;
        const sgstAmount = 4000;
        const totalAmount = subtotal - cgstAmount - sgstAmount;
        
        setCgst(cgstAmount);
        setSgst(sgstAmount);
        setTotal(totalAmount);
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
           {roomData && bookingData && (
          <>       
                <Card className="p-3 m-4 shadow-sm" style={{ borderRadius: '10px', marginBottom: '20px',position:'relative',bottom:'30px' }}>
                 <Row className="justify-content-between align-items-center">
          <Col className='ms-3'>
            <div>Room  <span className="fw-semibold">0{roomData.id}</span>  </div>
            <div>
              Customers Id: <span className="fw-semibold">{bookingData.id}</span>
            </div>
          </Col>
          <Col className="text-start ms-5">
            <div className="fw-bold text-dark">{roomData.type} Room</div>
            <div>
              Days: <span style={{color:'red'}}>0{days}</span>
            </div>
          </Col>
        </Row>
      </Card>

      <div className="px-2 m-4">
        <h5 className="fw-bold mb-3">Invoice Summary</h5>
        <Row className="mb-2">
          <Col>Sub Total</Col>
          <Col className="text-end">{roomData.price* days}</Col>
        </Row>
        <Row className="mb-2">
          <Col >CGST</Col>
          <Col className="text-end text-secondary">- {cgst}</Col>
        </Row>
        <Row className="mb-2 ">
          <Col>SGST</Col>
          <Col className="text-end text-secondary">- {sgst}</Col>
        </Row>
        <Row>
          <Col className="fw-bold">Total (Rs)</Col>
          <Col className="text-end fw-bold fs-5">Rs {total}</Col>
        </Row>                 
        </div>
        <div className='m-5 p-5'></div>
        <hr></hr>
        <div className='mx-5'>
        <Button className=' w-100 p-3' style={{backgroundColor:'#008CA4',borderRadius:'50px',border:'#008CA4'}} onClick={() => navigate(`/ordercomplete/${id}`)}>Complete Booking</Button>
        </div>
        </>
           )}
        </div>
        </Container>
  )
}

export default inVoice



