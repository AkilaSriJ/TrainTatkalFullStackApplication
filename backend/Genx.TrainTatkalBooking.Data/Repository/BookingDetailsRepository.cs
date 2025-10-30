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
    public class BookingDetailsRepository:IBookingDetails
    {
        private readonly AppDbContext _context;
        public BookingDetailsRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<BookingDetail> GetAll()
        {
            var result = _context.BookingDetails.ToList();
            return result;
        }

        public BookingDetail Get(int id)
        {
            var result = _context.BookingDetails
                .Include(b=>b.Train)
                .Include(b=>b.Coach)
                .Include(b=>b.Passenger)
                .FirstOrDefault(b=>b.BookingId==id);
            return result;
        }
        public void Add(BookingDetail bookingDetails)
        {
            _context.BookingDetails.Add(bookingDetails);
            _context.SaveChanges();
        }

        public void Update(BookingDetail bookingDetails)
        {
            try
            {
                _context.BookingDetails.Update(bookingDetails);
                _context.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            
        }

        public void Delete(BookingDetail bookingDetails)
        {
            _context.BookingDetails.Remove(bookingDetails);
            _context.SaveChanges();
        }
    }
}
