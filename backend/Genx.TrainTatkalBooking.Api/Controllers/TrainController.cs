using Genx.TrainTatkalBooking.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Genx.TrainTatkalBooking.Data.Model;
using Genx.TrainTatkalBooking.Model.DTO;

namespace Genx.TrainTatkalBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly ITrainService _trainService;
        public TrainController(ITrainService trainService)
        {
            _trainService = trainService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _trainService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _trainService.Get(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Create(TrainCreateDto train)
        {
            if (train == null)
            {
                return BadRequest("Train data is null");
            }
            _trainService.Add(train);
            return Ok(train);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TrainUpdateDto train)
        {
            if (train == null)
            {
                return BadRequest("Train data is null");
            }
            var existingTrain = _trainService.Get(id);
            if (existingTrain == null)
            {
                return NotFound();
            }
            _trainService.Update(id, train);
            return Ok(train);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingTrain = _trainService.Get(id);
            if (existingTrain == null)
            {
                return NotFound();
            }
            _trainService.Delete(id);
            return NoContent();
        }
    }
}
