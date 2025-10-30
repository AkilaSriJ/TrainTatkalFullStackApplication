import { useEffect, useState } from 'react'
import { Button, Container  } from 'react-bootstrap';
import { ArrowLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useParams } from 'react-router-dom';
import type {  IgetTrainData } from '../types/auth';
import { getTrainDetails} from '../services/apiclient';
import { FaFilter } from "react-icons/fa";

const AvailableTrains = () => {
    const navigate = useNavigate();
    const { trainId } = useParams();
    const [trainData,setTrainData] = useState<IgetTrainData[] >([]);
    
  useEffect(() => {
      console.log('ID param:', trainId);
         const fetchTrainData = async() =>{
            if(!trainId) return;
             try {
                const seats = await getTrainDetails();
                setTrainData(seats);
              } catch (error) {
                console.error("Error fetching train data:", error);
              }finally{
        }
    };
    fetchTrainData();
    },[trainId]);

  return (
    <Container fluid className="container" style={{ fontFamily: 'san-serif', maxWidth: '450px', padding: 0, position: 'relative' }}>
      <div className='d-flex justify-content-between mt-5'>
        <span className='top'>
          <ArrowLeft style={{ cursor: 'pointer', color: '#ffff' }} onClick={() => navigate(-1)} />
        </span>
        <h1 className='text'>TatkalNow</h1>
        <span className='icon'><MdOutlineNotificationsNone /></span>
      </div>

      <div className='wrapper mt-5 pt-4' style={{ fontFamily: 'sans-serif', maxWidth: '450px', height: '100vh', padding: 0, position: 'relative' }}>
      <span className='d-flex gap-5 mx-4 '><Button className= 'mt-4 p-2 ms-3' style={{ borderRadius: '50px', backgroundColor: '#fd7e14', border: '#fd7e14'}} type='submit'>Sort By</Button>
      <Button className= 'mt-4 p-2 ms-3' style={{ borderRadius: '50px', backgroundColor: '#fd7e14', border: '#fd7e14'}} type='submit'>Available</Button>
        <FaFilter size={24} className="position-absolute" style={{ top: '7.5%', left: '370px', transform: 'translateY(-50%)', color:  '#fd7e14' }} /></span>

          {trainData.length > 0?  (
            trainData.map((train) => (
          <div key={`coach-${train.trainId}`} className='mx-4 mt-4 pt-2'   style={{ border: '1px solid #ccc'}} >
          <h4 className='pt-2 mx-4'><strong>Train ID: </strong> {train.trainId}</h4>
          <div className='d-flex'>
          
          <span className='m-4'><p><strong>TrainData:</strong> {train.coachName.toString()}</p>
          <p><strong>CoachId:</strong> {train.coachId}</p>
          
          <p><strong>Available Seats:</strong> {train.totalSeats}</p>
          <p><strong>Tatkal Seats:</strong> {train.totalTatkalSeats}</p></span>
          <span className='m-4'><p><strong>Class Type:</strong>{train.classType}</p>
          <p><strong>Base Fare:</strong> ₹{train.baseFare}</p>
          <p><strong>Tatkal Price:</strong> ₹{train.tatkalPrice}</p></span>
          </div>
            <button onClick={() => {
            navigate(`/userinformation/${trainId}/${train.coachId}`);
           }}
            className="btn btn-primary m-4 d-block mx-auto" style={{ borderRadius: '50px', backgroundColor: '#fd7e14', border: '#fd7e14'}} type='submit'>
            Continue
          </button>

        </div>
            ))
      ) : (
        <p className="m-4">Loading seat info...</p>
     )}
      
      </div>
   
    
    </Container>
    
  )
}

export default AvailableTrains