using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Service.Interface
{
    public interface ICoachService
    {
        IEnumerable<CoachReadDto> GetAll();
        CoachReadDto Get(int id);
        void Add(CoachCreateDto coach);
        void Update(int id,CoachUpdateDto coach);
        void Delete(int id);
    }
}
