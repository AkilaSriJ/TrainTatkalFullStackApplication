using Genx.TrainTatkalBooking.Data.Context;
using Genx.TrainTatkalBooking.Data.Interface;
using Genx.TrainTatkalBooking.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Data.Repository
{
    public class CoachRepository:ICoachRepository
    {
        private readonly AppDbContext _context;
        public CoachRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Coach> GetAll()
        {
            var result = _context.Coaches.ToList();
            return result;
        }

        public Coach Get(int id)
        {
            var result = _context.Coaches.Find(id);
            return result;
        }
        public IEnumerable<Coach> GetByTrainId(int trainId)
        {
            var result = _context.Coaches.Where(c => c.TrainId == trainId).ToList();
            return result;
        }

        public void Add(Coach coach)
        {
            try
            {
                _context.Coaches.Add(coach);
                _context.SaveChanges();

            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            
        }

        public void Update(Coach coach)
        {
            _context.Coaches.Update(coach);
            _context.SaveChanges();
        }

        public void Delete(Coach coach)
        {
            _context.Coaches.Remove(coach);
            _context.SaveChanges();
        }

    }
}
