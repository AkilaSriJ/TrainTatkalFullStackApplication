import React from 'react'
import { Container, Navbar, FormGroup,FormLabel,FormControl,Button} from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import icon from  '../assets/icon.jpg'
import image from '../assets/image.jpg';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vector from '../assets/vector.jpg'
import tv from '../assets/tv.jpg'
import car from '../assets/car.jpg'
import spring from '../assets/spring.jpg'
import star from '../assets/star.png'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const room = () => {
     const[detail, setDetail] = useState([]);
      const [fromDate, setFromDate] = useState('');
      const [toDate, setToDate] = useState('');
      const [totalPrice, setTotalPrice] = useState(0);
      const navigate = useNavigate();
      const { id } = useParams();


useEffect(() => {
  const fetchDetail = async () => {
  
    try {
      const res = await axios.get(`http://localhost:3000/api/rooms/${id}`);
      console.log("info response:", res.data);
      setDetail(res.data);
    } catch (error) {
      console.error('Error fetching info data:', error.res?.data || error.message || error);
    }
  };

      const from = localStorage.getItem('fromDate');
      const to = localStorage.getItem('toDate');
      const price = localStorage.getItem('price');

      setFromDate(from);
      setToDate(to);
      setTotalPrice(Number(price));
      fetchDetail();
}, []);
    

  return (



   <Container fluid className="container" style={{fontfamily:'san-serif', maxWidth:'450px',
                                   height: '100vh', padding: 0, position: 'relative'}}>
                <div className=' d-flex justify-content-between'><span className='top'><ArrowLeft style={{ cursor: 'pointer',color:'#ffff'}} onClick={() => navigate(-1)} /></span>
                <h1 className='text'>GenX Villa</h1>
                <span><img src={icon} alt='icon' className='icon' ></img></span></div>


        <div className='wrapper'  style={{fontfamily:'inter', maxWidth:'450px',
                                   height: '100vh', padding: 0, position: 'relative'}}>
            <img src={image} alt='image' style={{maxWidth:'450px',margin:'0, auto',width:'100%'}}></img>
            <div className='d-flex justify-content-between align-items-center m-4'>
            <div><h5 className='fw-bold'>Room {detail.id}</h5>
            <p>{detail.capacity} Persons</p>
            </div>
            <div className='fs-3 '><strong>Rs {totalPrice}</strong></div>
            </div>
 
        <div className=' d-flex justify-content-between m-4'>
            <FormGroup>
                <FormLabel className='fw-bold ' style={{marginBottom:"0px"}}>From
                    <FormControl type ='date' name='fromDate' value={fromDate} onChange={(e) => setFromDate(e.target.value)}>
                    </FormControl>
                    </FormLabel>
                </FormGroup>
                     
            <span ><img src={vector} alt='icon' style={{marginTop:"20px"}}></img></span>
                     
            <FormGroup>
                <FormLabel className='fw-bold' style={{marginBottom:"0px"}}>To</FormLabel>
                   <FormControl type ='date' name='toDate ' value={toDate} onChange={(e) => setToDate(e.target.value)}>
                   </FormControl>
            </FormGroup>
        </div>
        <div className='m-4 pt-2'><h5>Description</h5>
             <p style={{fontWeight:'400',fontSize:'14px'}}>{detail.description}</p>
             <hr></hr>
        <h4>Amenities</h4>
        <div className='d-flex gap-3'>
            <span ><img src={tv} alt='icon' style={{marginTop:"20px"}}></img></span>
            <span ><img src={car} alt='icon' style={{marginTop:"20px"}}></img></span>
            <span ><img src={spring} alt='icon' style={{marginTop:"20px"}}></img></span>   
        </div>
        </div>
        <hr></hr>
        <div className='m-4 d-flex justify-content-between'>
            <h4>Review</h4>
            <span ><img src={star} alt='icon' style={{marginTop:"20px",backgroundColor:"#ffff"}}></img></span>
        </div>
        <div className='m-5'>
        <Button className=' w-100 p-3' style={{backgroundColor:'#008CA4',borderRadius:'50px',border:'#008CA4'}} onClick={() => navigate(`/customerinformation/${id}`)}>Book Now</Button>
       </div>
</div>

</Container>


  )
}

export default room