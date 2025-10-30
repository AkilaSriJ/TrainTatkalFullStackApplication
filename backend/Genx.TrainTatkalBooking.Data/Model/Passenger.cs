using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Data.Model
{
    public class Passenger
    {
        public int PassengerId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }   
        public int CoachId { get; set; }
        public Coach Coach { get; set; }
        public BookingDetail BookingDetails { get; set; }
    }
}
