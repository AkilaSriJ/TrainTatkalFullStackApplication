using Genx.TrainTatkalBooking.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Data.Interface
{
    public interface IBookingDetails
    {
        IEnumerable<BookingDetail> GetAll();
        BookingDetail Get(int id);
        void Add(BookingDetail bookingDetails);
        void Update(BookingDetail bookingDetails);
        void Delete(BookingDetail bookingDetails);
        
    }
}
