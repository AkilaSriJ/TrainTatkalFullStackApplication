using Genx.TrainTatkalBooking.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Data.Interface
{
    public interface ICoachRepository
    {
        IEnumerable<Coach> GetAll();
        Coach Get(int id);
        void Add(Coach coach);
        void Update(Coach coach);
        void Delete(Coach coach);
        IEnumerable<Coach> GetByTrainId(int trainId);
    }
}
