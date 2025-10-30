using AutoMapper;
using Genx.TrainTatkalBooking.Data.Interface;
using Genx.TrainTatkalBooking.Data.Model;
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
    public class TrainService:ITrainService
    {
        private readonly ITrainRepository _trainRepository;
        private readonly IMapper _mapper;   
        public TrainService(ITrainRepository trainRepository, IMapper mapper)
        {
            _trainRepository = trainRepository;
            _mapper = mapper;
        }

        public IEnumerable<TrainReadDto> GetAll()
        {
            var result = _trainRepository.GetAll();
            return _mapper.Map<IEnumerable<TrainReadDto>>(result);
        }
        public TrainReadDto Get(int id)
        {
            var result = _trainRepository.Get(id);
           return _mapper.Map<TrainReadDto>(result);
        }

        public void Add(TrainCreateDto train)
        { 
            var result= _mapper.Map<Train>(train);
            _trainRepository.Add(result);
        }
        public void Update(int id, TrainUpdateDto train)
        {

            var existingTrain = _trainRepository.Get(id);
            if(existingTrain!=null)
            {
                _mapper.Map(train, existingTrain);
                _trainRepository.Update(existingTrain);
            }

        }
        public void Delete(int id)
        {
            var existingTrain = _trainRepository.Get(id);
            if (existingTrain == null)
            {
                throw new KeyNotFoundException($"Train with ID {existingTrain} not found.");
            }
           
            _trainRepository.Delete(existingTrain);
        }
    }
}
