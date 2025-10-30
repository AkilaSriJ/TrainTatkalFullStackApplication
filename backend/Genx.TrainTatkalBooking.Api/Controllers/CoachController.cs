using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Genx.TrainTatkalBooking.Service.Interface;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;
namespace Genx.TrainTatkalBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachController : ControllerBase
    {
        private readonly ICoachService _coachService;
        public CoachController(ICoachService coachService)
        {
            _coachService = coachService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var result = _coachService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _coachService.Get(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Create(CoachCreateDto coach)
        {
            if (coach == null)
            {
                return BadRequest("Coach data is null");
            }
            _coachService.Add(coach);
            return Ok(coach);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, CoachUpdateDto coach)
        {
            if (coach == null)
            {
                return BadRequest("Coach data is null");
            }
            var existingCoach = _coachService.Get(id);
            if (existingCoach == null)
            {
                return NotFound();
            }
            _coachService.Update(id, coach);
            return Ok(coach);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingCoach = _coachService.Get(id);
            if (existingCoach == null)
            {
                return NotFound();
            }
            _coachService.Delete(id);
            return NoContent();
        }
    }
}
