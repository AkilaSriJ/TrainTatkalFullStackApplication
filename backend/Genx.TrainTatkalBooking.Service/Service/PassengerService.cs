using Genx.TrainTatkalBooking.Data.Interface;
using Genx.TrainTatkalBooking.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;
using AutoMapper;

namespace Genx.TrainTatkalBooking.Service.Service
{
    public class PassengerService:IPassengerService
    {
        private readonly IPassengerRepository _passengerRepository;
        private readonly IMapper _mapper;
        public PassengerService(IPassengerRepository passengerRepository, IMapper mapper)
        {
            _passengerRepository = passengerRepository;
            _mapper = mapper;
        }
        public IEnumerable<PassengerReadDto> GetAll()
        {
           var result = _passengerRepository.GetAll();
            return _mapper.Map<IEnumerable<PassengerReadDto>>(result);
        }
        public PassengerReadDto Get(int id)
        {
            var result=_passengerRepository.Get(id);
            return _mapper.Map<PassengerReadDto>(result);
        }

        public PassengerReadDto Add(PassengerCreateDto passenger)
        {     
            var result = _mapper.Map<Passenger>(passenger);
            _passengerRepository.Add(result);
            var finalResult=_mapper.Map<PassengerReadDto>(result);
            return finalResult;
        }

        public void Update(int id, PassengerUpdateDto passenger)
        {
            var exist = _passengerRepository.Get(id);
            if (exist != null)
            {
                _mapper.Map(passenger, exist);
                _passengerRepository.Update(exist);
            }
        }


        public void Delete(int id)
        {
            var exist = _passengerRepository.Get(id);
            if(exist==null)
            {
                throw new Exception("Passenger not Found");
            }
            _passengerRepository.Delete(exist);
        }


        
    }
}
