using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;

namespace WebApplication1.Controllers
{
    [Route("api/register-song")]
    [ApiController]
    public class RegisterSongController : ControllerBase
    {
        private readonly IRegisterSongRepository _registerSongRepository;
        private readonly DataContext _context;
        private readonly IAuthRepository _authRepository;

        public RegisterSongController(IRegisterSongRepository registerSongRepository, DataContext context, IAuthRepository authRepository)
        {
            _registerSongRepository = registerSongRepository;
            _context = context;
            _authRepository = authRepository;
        }

        /// <summary>
        /// Get Register Song.
        /// </summary>
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetSongsAsync()
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var registerSong = await _registerSongRepository.GetSongsAsync();

                return Ok(registerSong);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Get Register Song By Id.
        /// </summary>
        [HttpGet("{registerSongId}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetSongAsync([FromRoute] int registerSongId)
        {
            try
            {
                if (!_registerSongRepository.RegisterSongExists(registerSongId))
                    return NotFound();

                var registerSong = await _registerSongRepository.GetSongAsync(registerSongId);

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return Ok(registerSong);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Create Register Song.
        /// </summary>
        [HttpPost("{contentId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RegisterSongDto>> CreateAsync([FromBody] RegisterSongDto registerSongDto, [FromRoute] int contentId)
        {
            if (registerSongDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _registerSongRepository.CreateAsync(contentId, registerSongDto);
                return Ok(registerSongDto);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Create Register Song by person Id.
        /// </summary>
        [HttpPost("register-song-by-person-id/{personId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RegisterSongDto>> RegisterSongByPersonId([FromBody] RegisterSongDto registerSongDto, [FromRoute] int personId)
        {
            if (registerSongDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                return Ok(await _registerSongRepository.CreateByPersonIdAsync(personId, registerSongDto));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Update Register Song.
        /// </summary>
        [HttpPut("{registerSongId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RegisterSongDto>> UpdateAsync([FromRoute] int registerSongId, [FromBody] RegisterSongDto registerSongDto)
        {
            if (registerSongDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _registerSongRepository.UpdateAsync(registerSongId, registerSongDto);
                return Ok(data);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Delete Register Song.
        /// </summary>
        [HttpDelete("{registerSongId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RegisterSongDto>> DeleteAsync([FromRoute] int registerSongId)
        {
            if (!_registerSongRepository.RegisterSongExists(registerSongId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _registerSongRepository.DeleteAsync(registerSongId);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
