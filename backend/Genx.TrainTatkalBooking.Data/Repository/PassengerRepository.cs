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
    public class PassengerRepository : IPassengerRepository
    {
        private readonly AppDbContext _context;
        public PassengerRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Passenger> GetAll()
        {
            var result = _context.Passengers.ToList();
            return result;
        }

        public Passenger Get(int id)
        {
            var result = _context.Passengers.Find(id);
            return result;
        }
        public void Add(Passenger passenger)
        {
            try
            {
                _context.Passengers.Add(passenger);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void Update(Passenger passenger)
        {
            _context.Passengers.Update(passenger);
            _context.SaveChanges();
        }

        public void Delete(Passenger passenger)
        {
            _context.Passengers.Remove(passenger);
            _context.SaveChanges();
        }
    }
}
