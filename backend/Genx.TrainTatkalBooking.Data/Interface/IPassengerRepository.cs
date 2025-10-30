using Genx.TrainTatkalBooking.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Data.Interface
{
    public interface IPassengerRepository
    {
        IEnumerable<Passenger> GetAll();
        Passenger Get(int id);
        void Add(Passenger passenger);
        void Update(Passenger passenger);
        void Delete(Passenger passenger);
    }
}
