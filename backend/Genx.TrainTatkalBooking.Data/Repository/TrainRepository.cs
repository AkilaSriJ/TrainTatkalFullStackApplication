using Genx.TrainTatkalBooking.Data.Context;
using Genx.TrainTatkalBooking.Data.Interface;
using Genx.TrainTatkalBooking.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Data.Repository
{
    public class TrainRepository:ITrainRepository
    {
        private readonly AppDbContext _context;
        public TrainRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Train> GetAll()
        {
            var result = _context.Trains.ToList();
            return result;
        }

        public Train Get(int id)
        {
            var result = _context.Trains.Find(id);
            return result;
        }
        public void Add(Train train)
        {
            _context.Trains.Add(train);
            _context.SaveChanges();
        }

        public void Update(Train train)
        {
            _context.Trains.Update(train);
            _context.SaveChanges();
        }

        public void Delete(Train train)
        {
            _context.Trains.Remove(train);
            _context.SaveChanges();
        }
    }
}
