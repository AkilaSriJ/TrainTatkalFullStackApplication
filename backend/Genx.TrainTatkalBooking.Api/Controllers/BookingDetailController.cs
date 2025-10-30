using Genx.TrainTatkalBooking.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;

namespace Genx.TrainTatkalBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        public BookingDetailController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result=_bookingService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _bookingService.Get(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Post(BookingCreateDto bookingDetail)
        {
            if (bookingDetail == null)
            {
                return BadRequest("Booking detail cannot be null");
            }
           var result= _bookingService.ConfirmBooking(bookingDetail);
           return Ok(result);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, BookingUpdateDto bookingDetail)
        {
            if (bookingDetail == null)
            {
                return BadRequest("Booking detail cannot be null");
            }
            _bookingService.Update(id, bookingDetail);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var bookingDetail = _bookingService.Get(id);
            if (bookingDetail == null)
            {
                return NotFound();
            }
            _bookingService.Delete(id);
            return NoContent();
        }
    }
}
