using Genx.TrainTatkalBooking.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Genx.TrainTatkalBooking.Model.DTO;
using Genx.TrainTatkalBooking.Common.Enum;

namespace Genx.TrainTatkalBooking.Service.Interface
{
    public interface IBookingService
    {
        IEnumerable<BookingReadDto> GetAll();
        BookingReadDto Get(int id);
        BookingReadDto ConfirmBooking(BookingCreateDto bookingDetails);
        void Update(int id,BookingUpdateDto bookingDetails);
        void Delete(int id);
        ClassType GetProTatkal(ClassType classType,IEnumerable<Coach> availableCoach);
        ClassType GetPremiumTatkal(IEnumerable<Coach> availableCoach);
    }
}
