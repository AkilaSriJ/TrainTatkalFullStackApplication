import React from 'react'
import { Container,Col,Row, FormGroup,FormLabel,FormControl,Button, Card} from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import icon from  '../assets/icon.jpg'
import vector from '../assets/vector.jpg'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import ico from'../assets/ico.jpg';
import icoo from '../assets/icoo.jpg'
import axios from 'axios'



const home = () => {

  const [info, setInfo] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [type, setType] = useState('All');
  const [days, setDays] = useState(0);
  

  const navigate = useNavigate();
   
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/rooms`,{
          params: {
            from: fromDate,
            to: toDate,
            type: type !== 'All' ? type : '',
          }
        });
        console.log("info response:", res.data);
        setInfo(res.data);
      } catch (error) {
        console.error('Error fetching info data:', error.response?.data || error.message);
      }
    };
    fetchInfo();
  }, [fromDate, toDate, type]);

  useEffect(() => {
    if (fromDate && toDate ){
      const start=new Date(fromDate)
      const end=new Date(toDate)
      const first = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      const diff = (last - first) / (1000 * 60 * 60 * 24);
      setDays(diff);
    } 
  })



  return (
    <>
        <Container fluid className="container" style={{fontfamily:'san-serif', maxWidth:'450px',
                                   height: '100vh', padding: 0, position: 'relative'}}>
                <div className=' d-flex justify-content-between'><span className='top'><ArrowLeft style={{ cursor: 'pointer',color:'#ffff'}} onClick={() => navigate(-1)} /></span>
                <h1 className='text'>GenX Villa</h1>
                <span><img src={icon} alt='icon' className='icon' ></img></span></div>


        <div className='wrapper'  style={{fontfamily:'inter', 
                                   height: '100vh', padding: 0, position: 'relative'}}>
         
            

        <div className='day d-flex justify-content-between'>
            <FormGroup>
                <FormLabel className='fw-bold calender ' style={{marginBottom:"0px"}}>From
                    <FormControl type ='date' name='fromDate' value={fromDate} onChange={(e) => setFromDate(e.target.value)}>
                    </FormControl>
                </FormLabel>
            </FormGroup>
             
             <span className='calender'><img src={vector} alt='icon' style={{marginTop:"20px"}}></img></span>
             
            <span className='calender'>
                <FormGroup>
                 <FormLabel className='fw-bold' style={{marginBottom:"0px"}}>To</FormLabel>
                    <FormControl type ='date' name='toDate ' value={toDate} onChange={(e) => setToDate(e.target.value)}>
                    </FormControl>
                </FormGroup></span>
        </div>

         <div className='d-flex justify-content-between mb-3 mx-3 mt-3'>
            {['All', 'AC', 'Non-AC', 'Duplex'].map((btnType) => (
              <Button style={{padding:'5px', margin:'2px'}}
                key={btnType}
                variant={type === btnType ? '#008CA4' : '#E6E6E6'}
                onClick={() => setType(btnType)}>
                {btnType}
              </Button>
            ))}
          </div>

          {Array.isArray(info) && info.length > 0 ? (
            info.map((item, idx) => {
              return(
              <Card key={idx} className="mx-3 " style={{ cursor: 'pointer' }}>
                <Card.Body className="d-flex justify-content-between align-items-center mx-3">
                    <div>
                    <h5 className='fw-bold'>Room {item.id }</h5>
                    <span className="d-flex align-items-center mb-1">
                    <img src={ico} alt='icon'></img>
                    <span className="fw-bold">Type</span>
                    <span className="ms-2 fw-medium" style={{color:'#008CA4'}}>{item.type}</span></span>
                    

                    <span className="d-flex align-items-center mb-1">
                    <img src={icoo} alt='icon'></img>
                     <span className="text-muted">Persons</span>
                     <span className="ms-2 fw-bold">{item.capacity}</span>
                    </span>
                  </div>
                  
                
                  <div className='align-items-end mt-2'>
                   <h5 className="fw-bold ms-4">{days} Days</h5>
                   <span><Button style={{borderRadius:'15px', backgroundColor:'#008CA4',border:'#008CA4'}} className="my-2 ms-4" 
                      onClick={() =>{
                          localStorage.setItem('fromDate', fromDate);
                          localStorage.setItem('toDate', toDate);
                          localStorage.setItem('days', days);
                          localStorage.setItem('price', item.price * days);
                          navigate(`/room/${item.id}`)}}>Reserve</Button></span>
                   <p className="text-muted">Price : <span style={{color:'#008CA4'}}> Rs {item.price}</span> </p>
                  {days > 0 && (
                  <p className="fw-bold" style={{ color: '#008CA4' }}>
                        Total: Rs {item.price  * days}</p>
                  )}
                   
                  </div>
          
                </Card.Body>
              </Card>
            );
          })
          ) : (
            <div className="text-center text-muted">No rooms available</div>
          )}
        
        </div>
        </Container>
    </>
  )
}

export default home