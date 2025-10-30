import {  Container } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { ArrowLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useParams } from 'react-router-dom';
import type { IGetBooking } from '../types/auth';
import { getBookingDetails } from '../services/apiclient'
import image from '../assets/image.png'


const Booking = () => {
    const navigate = useNavigate();
    const { trainId, coachId, passengerId, bookingId } = useParams();
    console.log(" ID from URL:", {trainId, coachId , passengerId, bookingId});
    const [bookingData ,setBookingData] = useState<IGetBooking | null >(null);

     
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (bookingId && !isNaN(Number(bookingId))) {
            const bookingRes = await getBookingDetails(Number(bookingId));
            console.log("Booking successful:",bookingRes.bookingId);
            setBookingData(bookingRes);
             } else {
            console.warn("Invalid booking ID in URL.");
            }
            } catch (error) {
           console.error("Booking failed:", error);
            }
            };
             fetchBooking();
            }, [bookingId]);

    const classType: Record<number, string> = {
        3 : "FirstAC" ,
        2: "SecondAC",
        1: "ThirdAC",
        0 : " Sleeper"
      };

    const tatkalUserType: Record<number, string> = {
          0 : "Standard", 
          1 :  "Pro",
          2 :  "Premium",
      };
    
  return (
     <Container fluid className="container" style={{ fontFamily: 'sans-serif', maxWidth: '450px', padding: 0 }}>
      <div className='d-flex justify-content-between mt-5'>
        <span className='top'>
          <ArrowLeft style={{ cursor: 'pointer', color: '#fff' }} onClick={() => navigate(-1)} />
        </span>
        <h1 className='text'>TatkalNow</h1>
        <span className='icon'><MdOutlineNotificationsNone /></span>
      </div>

      <div className='wrapper mt-5 pt-4' style={{ fontFamily: 'sans-serif'}}>
        <div className="m-4">
  <h4><strong>Booking Info</strong></h4>
  {bookingData ? (
    <div className="border p-2 my-2 d-flex gap-4">
     <div><p><strong>TrainID : </strong> {bookingData.trainId}</p>
      <p><strong>CoachID : </strong> {bookingData.coachId}</p>
      <p><strong>BookingId : </strong> {bookingData.bookingId}</p>
      <p><strong>Passenger ID:</strong> {bookingData.passengerId}</p></div>
      <div><p><strong>AllocatedClass : </strong>{classType[bookingData.allocatedClass]}</p>
      <p><strong>RequestedClass:</strong>{classType[bookingData.requestedClass]}</p>
      <p><strong>TatkalUsers : </strong>{tatkalUserType[bookingData.tatkalUsers]}</p>
       <p><strong>TotalCharge : </strong> {bookingData.totalCharge}</p></div>
     
    </div>
  ) : (
    <p>Loading passenger info...</p>
  )}
</div>
 <img src={image} style={{marginLeft:'60px', position:'relative',left:'60px',top:'10px'}}></img>
<h3 className='my-5 text-center'><strong>Your ticket is booked succesfully</strong></h3>
<br></br>
</div>
      </Container>
  )
}

export default Booking