import axios from 'axios';
import type {  IgetTrainData, ITrainss } from '../types/auth';
import type { IPassengerInfo } from '../types/auth';
import type { IClass } from '../types/auth';
import type { IGetPassengerInfo } from '../types/auth';
import type { IGetBooking } from '../types/auth';


const BASE_URL ='https://localhost:5193/api';


export const getTrains = async (
  source:string,
  destination:string,
  date:string
): Promise<ITrainss[]> => {
  const response = await axios.get<ITrainss[]>(`${BASE_URL}/Train`, {
    params:{source,destination,date,}
  });
return response.data;
};


export const getTrainDetails = async(
) : Promise<IgetTrainData[]> =>{
 const response = await axios.get<IgetTrainData[]>(`${BASE_URL}/Coach`);
 return response.data;
};


   export const  postPassenger = async (
    data : IPassengerInfo
  ): Promise< {passengerId: number} > =>{
  const response= await axios.post(`${BASE_URL}/Passenger`,data);
  return response.data;
}  

export const getPassenger = async (id:number
): Promise<IGetPassengerInfo> =>{
  const response = await axios.get<IGetPassengerInfo>(`${BASE_URL}/Passenger/${id}`);
  return response.data;
}


export const postBooking = async (
  data : IClass
  ): Promise<any> =>{
  const response= await axios.post(`${BASE_URL}/BookingDetail`,data);
  return response.data;
}

export const getBookingDetails = async (id:number) 
 :  Promise<IGetBooking> => {
  const response = await axios.get<IGetBooking>(`${BASE_URL}/BookingDetail/${id}`);
  return response.data;
}

