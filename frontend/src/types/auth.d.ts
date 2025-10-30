export interface IfromDataRequest{
    source: string;
    destination:string;
    date:string;

}

export interface ITrainss {
  id: number;
  trainId: string;
  source: string;
  destination: string;
  travelDate: string; 
}

export interface IgetTrainData{
  id: number;
  coachName : string;
  coachId:number;
  trainId : string;
  totalSeats: number;
  totalTatkalSeats: number;
  classType: number;
  baseFare: number;
  tatkalPrice:number;
}


// export type IBookingSelection = {
//   [coachName: string]: {
//     seatCount: number;
//     isTatkal: boolean;
//   };
// };
 

export interface IBookingPayload {
  coachName: string;
  trainId: string;
  totalSeats: number;
  totalTatkalSeats: number;
  classType: number;
  baseFare: number;
  tatkalPrice: number;
 
}


export interface IPassengerInfo  {
  name:string;
  age:number;
  gender:string;
  phoneNumber:string;
  email:string;
  coachId: number | null; 
}

export interface IGetPassengerInfo{
  name:string;
  age:number;
  gender:string;
  phoneNumber:string;
  email:string;
  coachId: number | null; 
  passengerId:number | null;

}

export interface IClass{
  requestedClass:number;
  tatkalUsers:number;
  trainId: number;
  coachId: number;
  passengerId: number; 
}

export interface IGetBooking{
  bookingId: number;
  allocatedClass:classType;
  requestedClass:classType;
  tatkalUsers:tatkalUserType;
  totalCharge:number;
  trainId:string;
  coachId:number | null;
  passengerId:number | null;
}