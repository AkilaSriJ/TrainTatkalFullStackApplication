using Genx.TrainTatkalBooking.Common.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Model.DTO
{
    public class BookingUpdateDto
    {
        public int? BookingId { get; set; }
        public ClassType? AllocatedClass { get; set; }
        public ClassType? RequestedClass { get; set; }
        public Quota? TatkalUsers { get; set; }

        [Precision(18, 2)]
        public decimal? TotalCharge { get; set; }
        public int? TrainId { get; set; }
        public int? CoachId { get; set; }
        public int? PassengerId { get; set; }
    }
}
