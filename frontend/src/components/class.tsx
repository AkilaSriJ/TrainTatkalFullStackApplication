
import React, { useState,useEffect} from 'react'
import { Button, Container ,Form, FormGroup, FormLabel,FormSelect } from 'react-bootstrap';
import { ArrowLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { postBooking } from '../services/apiclient';
import type { IClass } from '../types/auth';
import { getPassenger } from '../services/apiclient';
import type { IGetPassengerInfo } from '../types/auth';

const Class = () => {
    const navigate = useNavigate();
        const { trainId, coachId,passengerId } = useParams();
        console.log(" ID from URL:", trainId,coachId,passengerId);
        const [passenger, setPassenger] = useState<IGetPassengerInfo | null >(null);

         const [formData, setFormData] = useState({
            requestedClass: '',
            tatkalUsers: '',
          });
        
  useEffect(() => {
  const fetchPassenger = async () => {
    try {
      if (passengerId && !isNaN(Number(passengerId))) {
        const passengerData = await getPassenger(Number(passengerId));
        setPassenger(passengerData);
      } else {
        console.error("Invalid or missing passengerId:", passengerId);
      }
    } catch (error) {
      console.error("Failed to fetch passenger info:", error);
    }
  };

  fetchPassenger();
}, [passengerId]);

        const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prev:any) => ({
        ...prev,
        [name]: value,
        }));
        };
          
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const classTypeMap: Record<string,number> = {
      FirstAC: 3,
      SecondAC: 2,
      ThirdAC: 1,
      Sleeper: 0,
    };

      const quotaMap: Record<string,number> = {
      Standard: 0,
      Pro: 1,
      Premium: 2,
    };
    
    const bookingData: IClass = {
    requestedClass:classTypeMap[formData.requestedClass], 
    tatkalUsers: quotaMap[formData.tatkalUsers],  
    trainId: Number(trainId),
    coachId: Number(coachId),                                                                            
    passengerId:Number(passengerId),    
};

    try {
    const bookingRes = await postBooking(bookingData);
    const bookingId = bookingRes.bookingId;
    console.log("Booking successful:", bookingRes);
     navigate(`/booking/${trainId}/${coachId}/${passengerId}/${bookingId}`);
  } catch (error) {
    console.error("Booking failed:", error);
  }
  
};

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
        <div className="m-4">
  <h4>Passenger Info</h4>
  {passenger ? (
    <div className="border p-2 my-2">
      <div className=' d-flex gap-5'>
      <div> <p><strong>Passenger ID:</strong> {passenger.passengerId}</p>
      <p><strong>Coach ID:</strong> {passenger.coachId}</p>
      <p><strong>Name:</strong> {passenger.name}</p>
      <p><strong>Age:</strong> {passenger.age}</p></div>
      <div><p><strong>Gender:</strong> {passenger.gender}</p>
      <p><strong>Phone:</strong> {passenger.phoneNumber}</p>
      <p><strong>Email:</strong> {passenger.email}</p></div>
     </div>

    </div>
  ) : (
    <p>Loading passenger info...</p>
  )}
</div>

        <Form onSubmit={handleSubmit}>
             <FormGroup className="mx-4 my-5">
            <FormLabel className='fw-medium'>Select Class</FormLabel>
            <FormSelect name="requestedClass" value={formData.requestedClass} onChange={handleChange} required>
              <option value="">Select Class</option>
              <option value="FirstAC">AC 1 Tier</option>
              <option value="SecondAC">AC 2 Tier</option>
              <option value="ThirdAC">AC 3 Tier</option>
              <option value="Sleeper">Sleeper</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className="m-4">
            <FormLabel className='fw-medium'>Select Quota</FormLabel>
            <FormSelect name="tatkalUsers" value={formData.tatkalUsers} onChange={handleChange} required>
              <option value="">Select Quota</option>
              <option value="Standard">Standard</option>
              <option value="Pro">Pro</option>
              <option value="Premium">Premium</option>
            </FormSelect>
          </FormGroup>
       
         <Button 
            type="submit"
            className="w-75 p-2 my-5 mx-5"
            style={{ borderRadius: '50px', backgroundColor: '#fd7e14', border: '#fd7e14' }}
             >
             Confirm
        </Button>
         </Form>

      </div>
      </Container>
  )
};

export default Class