using Genx.TrainTatkalBooking.Common.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Model.DTO
{
    public class BookingCreateDto
    {
        public int TrainId { get; set; }
        public int CoachId { get; set; }
        public int PassengerId { get; set; }
        public ClassType RequestedClass { get; set; }
        public Quota TatkalUsers { get; set; }


    }
}
