
import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { Container,Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from  '../assets/icon.jpg'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const customerinformation = () => {

    const [formData, setFormData] = useState({
        FullName: '',
        email: '',
        mobileNumber: '',
      });
    const navigate = useNavigate();
    const { id } = useParams();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        }
    
    
      const handleSubmit = async (e) => {
      e.preventDefault();
    
      const { FullName, email, mobileNumber } = formData;
              const from = localStorage.getItem('fromDate');
              const to = localStorage.getItem('toDate');
    
      
      if (
        !FullName ||
        !email ||
        !mobileNumber 
      ) {
        alert('All fields are required. Please fill in every field.');
        return;
      }
     const payload= {roomId:Number(id),from,to, customer :{name:FullName,email,phone:mobileNumber}};
        try {
          const response = await axios.post('http://localhost:3000/api/bookings', payload);
          console.log('booking successfull!');
          const bookingId = response.data.id;
          localStorage.setItem("bookingId", bookingId);
          navigate(`/invoice/${id}`)
        } catch (error) {
          console.log('Failed to create user');
        }
      };
    
  return (
      <Container fluid className="container" style={{fontfamily:'san-serif', maxWidth:'450px',
                                         height: '100vh', padding: 0, position: 'relative'}}>
                      <div className=' d-flex justify-content-between'><span className='top'><ArrowLeft style={{ cursor: 'pointer',color:'#ffff'}} onClick={() => navigate(-1)} /></span>
                      <h1 className='text'>GenX Villa</h1>
                      <span><img src={icon} alt='icon' className='icon' ></img></span></div>

    <div className='wrapper'  style={{fontfamily:'inter', maxWidth:'450px',
                                   height: '100vh', padding: 0, position: 'relative'}}>

    <h1 className='mx-4 pt-5 pb-3' style={{color:'primary'}}>Customer information</h1>
            <h4 className='fw-medium m-4'>Customer 01</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="m-4" >
                <Form.Label className='fw-medium'>FullName</Form.Label>
                <Form.Control
                  name="FullName"
                  type="text"
                  value={formData.FullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
    
              <Form.Group className="m-4">
                <Form.Label className='fw-medium'>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
    
              <Form.Group className="m-4">
                <Form.Label className='fw-medium'>MobilePhone</Form.Label>
                <Form.Control
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
  
             

    <div className='m-5 p-5'></div>
    <hr></hr>
    <div className='mx-5'>
        <Button className=' w-100 p-3' type ="submit" style={{backgroundColor:'#008CA4',borderRadius:'50px',border:'#008CA4'}} >Book Now</Button>
    </div>
     </Form>
    </div>
    </Container>

  )
}

export default customerinformation