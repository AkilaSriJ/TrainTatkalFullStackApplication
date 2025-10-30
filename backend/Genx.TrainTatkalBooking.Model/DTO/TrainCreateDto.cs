using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Common.Enum;

namespace Genx.TrainTatkalBooking.Model.DTO
{
    public class TrainCreateDto
    {
        public string TrainName { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        [Required]
        public DateTime TravelDate { get; set; }

    }
}
