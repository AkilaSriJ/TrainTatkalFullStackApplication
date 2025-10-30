using Genx.TrainTatkalBooking.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;
namespace Genx.TrainTatkalBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        private readonly IPassengerService _passengerService;
        public PassengerController(IPassengerService passengerService)
        {
            _passengerService = passengerService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var result = _passengerService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _passengerService.Get(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Post(PassengerCreateDto passenger)
        {
            if (passenger == null)
            {
                return BadRequest("Passenger cannot be null");
            }
            var result=_passengerService.Add(passenger);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, PassengerUpdateDto passenger)
        {
            var existingPassenger = _passengerService.Get(id);
            if (existingPassenger == null)
            {
                return NotFound();
            }
            _passengerService.Update(id, passenger);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingPassenger = _passengerService.Get(id);
            if (existingPassenger == null)
            {
                return NotFound();
            }
            _passengerService.Delete(id);
            return NoContent();
        }
    }
}
