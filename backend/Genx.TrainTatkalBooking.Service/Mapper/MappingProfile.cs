using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;

namespace Genx.TrainTatkalBooking.Service.Mapper
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<TrainCreateDto, Train>();
            CreateMap<TrainUpdateDto, Train>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null && !(srcMember is DateTime dt && dt == default)));
            CreateMap<Train, TrainReadDto>();
            CreateMap<CoachCreateDto, Coach>();
            CreateMap<CoachUpdateDto, Coach>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Coach, CoachReadDto>();
            CreateMap<PassengerCreateDto, Passenger>();
            CreateMap<PassengerUpdateDto, Passenger>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Passenger, PassengerReadDto>();
            CreateMap<BookingCreateDto, BookingDetail>();
            CreateMap<BookingUpdateDto, BookingDetail>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<BookingDetail, BookingReadDto>();
        }
    }
}
