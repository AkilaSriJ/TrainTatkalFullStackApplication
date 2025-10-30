using AutoMapper;
using Genx.TrainTatkalBooking.Data.Interface;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Data.Repository;
using Genx.TrainTatkalBooking.Model.DTO;
using Genx.TrainTatkalBooking.Service.Interface;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Service.Service
{
    public class CoachService:ICoachService
    {
      private readonly ICoachRepository _coachRepository;
      private readonly IMapper _mapper;
        public CoachService(ICoachRepository coachRepository,IMapper mapper)
        {
            _coachRepository = coachRepository;
            _mapper = mapper;
        }
        public IEnumerable<CoachReadDto> GetAll()
        {
            var result = _coachRepository.GetAll();
            return _mapper.Map<IEnumerable<CoachReadDto>>(result);
        }  
        public CoachReadDto Get(int id)
        {
            var result = _coachRepository.Get(id);
            return _mapper.Map<CoachReadDto>(result);
        }   

        public void Add(CoachCreateDto coach)
        {
            var result = _mapper.Map<Coach>(coach);
            _coachRepository.Add(result);
        }
        public void Update(int id, CoachUpdateDto coach)
        {
            var existingCoach = _coachRepository.Get(id);
            if(existingCoach!=null)
            {
                _mapper.Map(coach, existingCoach);
                _coachRepository.Update(existingCoach);
            }
        }
        public void Delete(int id)
        {
            var exist=_coachRepository.Get(id);
            if (exist == null)
            {
                throw new KeyNotFoundException($"Coach with ID {id} not found.");
            }
            _coachRepository.Delete(exist);
        }

    }
}
