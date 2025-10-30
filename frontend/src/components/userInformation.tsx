import React, { useState,useEffect} from 'react'
import { Button, Container ,Form, FormControl, FormGroup, FormLabel,FormSelect } from 'react-bootstrap';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft} from 'lucide-react';
import type { IPassengerInfo} from '../types/auth';
import { useParams } from 'react-router-dom';
import {postPassenger } from '../services/apiclient';

const UserInformation = () => {

    const navigate = useNavigate();
    const { trainId,coachId } = useParams();
    console.log("Coach ID from URL:", trainId,coachId);

    const [formData, setFormData] = useState<IPassengerInfo>({
    name: '',
    age: 0,
    gender: '',
    phoneNumber: '',
    email: '',
    coachId:null,
  });

  useEffect(() => {
  
  }, []);
    const handleChange = (e:React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev,[name]: value,}));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    

  try {
    const passengerData: IPassengerInfo = {
    name: formData.name,
    age: Number(formData.age),
    gender: formData.gender,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    coachId: coachId ? Number(coachId) : null,
  };

    const passengerRes = await postPassenger(passengerData);
    const passengerId = passengerRes.passengerId;
    console.log("Passenger created with ID:", passengerId);
    navigate(`/class/${trainId}/${coachId}/${passengerId}`);
  } catch (err) {
    console.error("Error submitting booking:", err);
   
  }
}
  return (
    <Container fluid className="container" style={{ fontFamily: 'sans-serif', maxWidth: '450px', padding: 0 }}>
      <div className='d-flex justify-content-between mt-5' style={{ fontFamily: 'sans-serif'}}>
        <span className='top'>
          <ArrowLeft style={{ cursor: 'pointer', color: '#fff' }} onClick={() => navigate(-1)} />
        </span>
        <h1 className='text'>TatkalNow</h1>
        <span className='icon'><MdOutlineNotificationsNone /></span>
      </div>

      <div className='wrapper mt-5 pt-4' style={{ fontFamily: 'sans-serif'}}>
        <h4 className='fw-medium m-4'><strong>Passenger Information</strong></h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="m-4">
            <FormLabel className='fw-medium'><strong>Name</strong></FormLabel>
            <FormControl name="name" type="text" value={formData.name} onChange={handleChange} required />
          </FormGroup>

          <FormGroup className="m-4">
            <FormLabel className='fw-medium'><strong>Age</strong></FormLabel>
            <FormControl name="age" type="number" value={formData.age} onChange={handleChange} required />
          </FormGroup>

          <FormGroup className="m-4">
            <FormLabel className='fw-medium'><strong>Gender</strong></FormLabel>
            <FormSelect name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
               <option value="Male">Male</option>
              <option value="Female">Female</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="m-4">
            <FormLabel className='fw-medium'><strong>Phone Number</strong></FormLabel>
            <FormControl name="phoneNumber" type="text" value={formData.phoneNumber} onChange={handleChange} required />
          </FormGroup>

          <FormGroup className="m-4">
            <FormLabel className='fw-medium'><strong>Email</strong></FormLabel>
            <FormControl name="email" type="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>

          <div className="m-4 text-center">
            <Button 
           type="submit"
             className="w-75 p-2 my-5 mx-5"
            style={{ borderRadius: '50px', backgroundColor: '#fd7e14', border: '#fd7e14' }}
            >
          Continue Booking
        </Button>

          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UserInformation;