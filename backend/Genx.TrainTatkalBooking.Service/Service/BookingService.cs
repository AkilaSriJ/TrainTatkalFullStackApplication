using Genx.TrainTatkalBooking.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Data.Interface;
using Genx.TrainTatkalBooking.Data.Model;
using AutoMapper.Configuration.Annotations;
using Genx.TrainTatkalBooking.Common.Enum;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Identity.Client;
using Genx.TrainTatkalBooking.Model.DTO;
using AutoMapper;
namespace Genx.TrainTatkalBooking.Service.Service
{
    public class BookingService:IBookingService
    {
        private readonly IBookingDetails _bookingDetails;
        private readonly IMapper _mapper;
        private readonly ICoachRepository _coachRepository;
        private readonly ITrainRepository _trainRepository;
        public BookingService(IBookingDetails bookingDetails,IMapper mapper,ICoachRepository coachRepository,ITrainRepository trainRepository)
        {
            _bookingDetails = bookingDetails;
            _mapper = mapper;
            _coachRepository = coachRepository;
            _trainRepository = trainRepository;
        }
        public IEnumerable<BookingReadDto>GetAll()
        {
            var result = _bookingDetails.GetAll();
            return _mapper.Map<IEnumerable<BookingReadDto>>(result);
        }
        public BookingReadDto Get(int id)
        {
            var result = _bookingDetails.Get(id);
            return _mapper.Map<BookingReadDto>(result);
        }
       
        public ClassType GetProTatkal(ClassType requestClass,IEnumerable<Coach> coach)
        {
            var requestedClass = coach.Where(x => x.ClassType == requestClass).Sum(x=>x.TotalTatkalSeats);   
            if(requestedClass > 0)
            {
                return requestClass;
            }
            int nextValue = (int)requestClass + 1;
            if(Enum.IsDefined(typeof(ClassType), nextValue))
            {
                var nextClass = (ClassType)nextValue;
                var nextClassSeats = coach.Where(x => x.ClassType == nextClass).Sum(x => x.TotalTatkalSeats);
                if (nextClassSeats > 0)
                {
                    return nextClass;
                }
            }
            throw new Exception("No Pro Tatkal Class Available");
        }
        public ClassType GetPremiumTatkal(IEnumerable<Coach> coach)
        {
            var availableClass = Enum.GetValues(typeof(ClassType)).Cast<ClassType>().OrderByDescending(x => (int)x);
            foreach(var classType in availableClass)
            {
                var availableSeats = coach.Where(x => x.ClassType == classType).Sum(x => x.TotalTatkalSeats);
                if (availableSeats > 0)
                {
                    return classType;
                }
            }
            throw new Exception("No Premium Tatkal Class Available");
        }

        public BookingReadDto ConfirmBooking(BookingCreateDto bookingDetails)
        {
            var booking = _mapper.Map<BookingDetail>(bookingDetails);
            var train = _trainRepository.Get(bookingDetails.TrainId);
            var coach = _coachRepository.Get(bookingDetails.CoachId);
            var coachDetails = _coachRepository.GetByTrainId(bookingDetails.TrainId);
           
            booking.Train = train;
            booking.Coach = coach;
           
            decimal tatkalPrice = coach.TatkalPrice;
            decimal totalCharge = 0;
                        
            var quota= booking.TatkalUsers;
            if (quota == Quota.Standard)
            {
                var requestedClass =booking.RequestedClass;
                booking.AllocatedClass = requestedClass;
                var allocatedBaseFare =  coachDetails.Where(x => x.ClassType == requestedClass).Select(t => t.BaseFare).FirstOrDefault();
                var availableseats = coachDetails.Where(x=> x.ClassType == requestedClass ).Select(t=>t.TotalTatkalSeats).FirstOrDefault();
                if (availableseats <= 0)
                {
                    throw new Exception("No Tatkal Seats Available or waitlisted");

                }
                coach.TotalTatkalSeats -= 1;
                _coachRepository.Update(coach);
                totalCharge = allocatedBaseFare + tatkalPrice;
            }
            else if (quota == Quota.ProTatkal )
            {
                var requestedClass = GetProTatkal(booking.RequestedClass,coachDetails);
                booking.AllocatedClass = requestedClass;
                var allocatedBaseFare = coachDetails.Where(x => x.ClassType == requestedClass).Select(t => t.BaseFare).FirstOrDefault();
                var requestedBaseFare = coachDetails.Where(x=>x.ClassType== requestedClass).Select(t=>t.BaseFare).FirstOrDefault();
                
                decimal classDifference = allocatedBaseFare - requestedBaseFare;
                int classJumped = (booking.AllocatedClass - booking.RequestedClass);
                decimal upgradeFee = classJumped * 100;
                var availableseats = coachDetails.Where(x => x.ClassType == requestedClass).Select(t => t.TotalTatkalSeats).FirstOrDefault();
                if (availableseats <= 0)
                {
                    throw new Exception("No Pro Tatkal Seats Available");

                }
                coach.TotalTatkalSeats -= 1;
                _coachRepository.Update(coach);
                totalCharge = allocatedBaseFare + classDifference + upgradeFee + tatkalPrice*2.5m;
            }
            else if (quota == Quota.PremiumTatkal)
            {
                var requestedClass = GetPremiumTatkal(coachDetails);
                booking.AllocatedClass = requestedClass;
                var allocatedBaseFare = coachDetails.Where(x => x.ClassType == requestedClass).Select(t => t.BaseFare).FirstOrDefault();
                var requestedBaseFare = coachDetails.Where(x => x.ClassType == bookingDetails.RequestedClass).Select(t => t.BaseFare).FirstOrDefault();

                decimal classDifference = allocatedBaseFare - requestedBaseFare;
                int classJumped = (booking.AllocatedClass - booking.RequestedClass);
                var availableseats = coachDetails.Where(x => x.ClassType == requestedClass).Select(t => t.TotalTatkalSeats).FirstOrDefault();
                if (availableseats <= 0)
                {
                    throw new Exception("No Premium Tatkal Seats Available");
                }
                coach.TotalTatkalSeats -= 1;
                int availableTatkalSeats = coach.TotalTatkalSeats;
                _coachRepository.Update(coach);

                decimal upgradeFee = classJumped * 100;
                int demandFactor = (coach.TotalTatkalSeats - availableTatkalSeats) / coach.TotalTatkalSeats;
                var premiumFactor = coach.TatkalPrice * demandFactor;

                totalCharge = allocatedBaseFare + classDifference + upgradeFee + (tatkalPrice * premiumFactor);
            }
             booking.TotalCharge = totalCharge;
            _bookingDetails.Update(booking);
            var result=_mapper.Map<BookingReadDto>(booking);
            return result;
        }

        public void Update(int id, BookingUpdateDto bookingDetails)
        {
            var existingBooking = _bookingDetails.Get(id);
            if (existingBooking != null)
            {
                _mapper.Map(bookingDetails, existingBooking);
                _bookingDetails.Update(existingBooking);
            }

        }
        public void Delete(int id)
        {
            var booking = _bookingDetails.Get(id);
            if (booking == null)
            {
                throw new Exception("Booking not found");
            }
            _bookingDetails.Delete(booking);
        }
    }
}
