using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;

namespace Genx.TrainTatkalBooking.Service.Interface
{
    public interface ITrainService
    {
        IEnumerable<TrainReadDto> GetAll();
        TrainReadDto Get(int id);
        void Add(TrainCreateDto train);
        void Update(int id,TrainUpdateDto train);
        void Delete(int id);
    }
}
