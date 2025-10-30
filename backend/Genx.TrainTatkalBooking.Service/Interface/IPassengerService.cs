using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Service.Interface
{
    public interface IPassengerService
    {
        IEnumerable<PassengerReadDto> GetAll();
        PassengerReadDto Get(int id);
        PassengerReadDto Add(PassengerCreateDto passenger);
        void Update(int id,PassengerUpdateDto passenger);
        void Delete(int id);
    }
}
