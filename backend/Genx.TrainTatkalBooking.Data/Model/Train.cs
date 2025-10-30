using AutoMapper.Execution;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Common.Enum;

namespace Genx.TrainTatkalBooking.Data.Model
{
    public class Train
    {
        public int TrainId { get; set; }
        public string TrainName { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        [Required]
        public DateTime TravelDate { get; set; }
        public ICollection<Coach> Coaches { get; set; }
        public ICollection<BookingDetail> BookingDetails { get; set; }
    }
}
