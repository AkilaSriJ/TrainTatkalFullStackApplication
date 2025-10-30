using Genx.TrainTatkalBooking.Common.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genx.TrainTatkalBooking.Model.DTO
{
    public class CoachCreateDto
    {
        public string CoachName { get; set; }
        public int TotalSeats { get; set; }
        public int TotalTatkalSeats { get; set; }
        public ClassType ClassType { get; set; }

        [Precision(18, 2)]
        public decimal BaseFare { get; set; }
        [Precision(18, 2)]
        public decimal TatkalPrice { get; set; }
        public int TrainId { get; set; }
    }
}
