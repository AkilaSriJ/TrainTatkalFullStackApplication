using Genx.TrainTatkalBooking.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Data.Interface
{
    public interface ITrainRepository
    {
        IEnumerable<Train> GetAll();
        Train Get(int id);
        void Add(Train train);
        void Update(Train train);
        void Delete(Train train);
    }
}
