
import { Container, Button, Form, } from 'react-bootstrap';
import { ArrowLeft,Train} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNotificationsNone } from "react-icons/md";
import type { IfromDataRequest } from '../types/auth';
import type {ITrainss } from '../types/auth';
import { getTrains } from '../services/apiclient'; 


const Home = () => {
  const [from, setFrom] = useState<IfromDataRequest>({
    source: '',
    destination: '',
    date: '',
  });

  const [trainResults, setTrainResults] = useState<ITrainss[]>([]);
  const [type, setType] = useState('All');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFrom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
     const trainn = await getTrains(from.source,from.destination,from.date);
     setTrainResults(trainn);
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  };

  return (
    <Container fluid className="container" style={{ fontFamily: 'sans-serif', maxWidth: '450px', padding: 0, position: 'relative' }}>
      <div className='d-flex justify-content-between  mt-5'>
        <span className='top'>
          <ArrowLeft style={{ cursor: 'pointer', color: '#ffff' }} onClick={() => navigate(-1)} />
        </span>
        <h1 className='text'>TatkalNow</h1>
        <span className='icon'><MdOutlineNotificationsNone /></span>
      </div>

      <div className='wrapper' style={{ fontFamily: 'sans-serif', maxWidth: '450px', height: '100vh', padding: 0, position: 'relative' }}>
        <div className='d-flex justify-content-space gap-5 m-4'>
          {['Oneway', 'RoundTrip'].map((btnType) => (
            <Button className='mt-5' style={{ padding: '5px', margin: '4px', font: '20px', color: '#fd7e14', border: '0.5px solid  #ced4da' }}
              key={btnType}
              variant={type === btnType ? '#fd7e14' : '#E6E6E6'}
              onClick={() => setType(btnType)}
            >
              {btnType}
            </Button>
          ))}
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className='mx-4 my-5 fw-medium d-flex gap-5 align-item-center'>
            <Train size={18} className="position-absolute" style={{ top: '16.5%', left: '140px', transform: 'translateY(-50%)', color: '#555' }} />
            <Form.Select name="source" value={from.source} onChange={handleChange} required>
              <option value="">Source </option>
              <option value="Chennai">Chennai</option>
              <option value="Villupuram">Velankani</option>
              <option value="Dindigul">Dindigul</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Mumbai">Rameshwaram</option>
            </Form.Select>

            <Form.Select name="destination" value={from.destination} onChange={handleChange} required>
              <option value="">Destination</option>
              <option value="Chennai">Chennai</option>
              <option value="Villupuram">Villupuram</option>
              <option value="Dindigul">Dindigul</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Mumbai">Mumbai</option>
            </Form.Select>
            <Train size={18} className="position-absolute" style={{ top: '16.5%', left: '370px', transform: 'translateY(-50%)', color: '#555' }} />
          </Form.Group>

          <Form.Group className='mx-4 my-5 fw-medium d-flex gap-5 justify-content-between'>
            <Form.Control name="date" type="date" value={from.date} onChange={handleChange} required />
          </Form.Group>

          <Button className='w-75 p-2 my-5 mx-5' style={{ borderRadius: '50px', backgroundColor: '#fd7e14', border: '#fd7e14' }} type='submit'>
            Search Train
          </Button>
        </Form>

        <div className='mx-4'>
          <h4><strong>Available Trains</strong></h4>
          {trainResults.length > 0 ? (
            trainResults.map((train) => (

              <div key={train.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px' }} className='d-flex justify-content-between my-4'>
                <span><p><strong>Train ID:</strong> {train.trainId|| 'Not Assigned'}</p>
                <p><strong>{train.source} → {train.destination}</strong></p>
                <p><strong>Date:</strong> {new Date(train.travelDate).toLocaleDateString()}</p></span>
               <span><Button onClick={() => navigate(`/availabletrains/${train.trainId}`)}  className= 'mt-4 p-2' style={{ borderRadius: '50px', backgroundColor: '#fd7e14', border: '#fd7e14'}} type='submit'>Book Now</Button></span> 
              </div>

            ))
          ) : (
            <p className='text-start text-muted'>No trains available</p>
          )}
        </div>

      </div>
    </Container>
  );
};

export default Home;
