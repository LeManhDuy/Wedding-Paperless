using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Interfaces.IService;

namespace WebApplication1.Controllers
{
  [Route("api/albumn")]
  [ApiController]
  public class AlbumnController : ControllerBase
  {
    public readonly DataContext _context;
    public readonly IAlbumService _albumService;
    public readonly IAlbumnRepository _albumnRepository;
    public readonly IAuthRepository _authRepository;
    public AlbumnController(DataContext dataContext, IAlbumnRepository albumnRepository, IAuthRepository authRepository, IAlbumService albumService)
    {
      _albumService = albumService;
      _context = dataContext;
      _albumnRepository = albumnRepository;
      _authRepository = authRepository;
    }

        /// <summary>
        /// Get albumnss.
        /// </summary>
        [Authorize(Roles = "admin")]
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AlbumnDto>))]
        public async Task<IActionResult> GetAlbumns()
        {
            if (!_authRepository.IsTokenValid())
            {
                return RedirectToAction("SignIn", "Account");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var albumns = await _albumnRepository.GetAlbumns();
            return Ok(albumns);
        }

        /// <summary>
        /// Get albumn by Id.
        /// </summary>
        [HttpGet("{albumnId}")]
        [ProducesResponseType(200, Type = typeof(AlbumnDto))]
        public async Task<IActionResult> GetAlbumns(int albumnId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var albumn = await _albumnRepository.GetAlbumnById(albumnId);
            return Ok(albumn);
        }

    /// <summary>
    /// Create albumn.
    /// </summary>
    [HttpPost("{contentId}")]
    [Authorize(Roles = "user, admin")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> CreateAlbumn([FromRoute] int contentId, [FromBody] AlbumnDto albumnDto)
    {
      if (!_authRepository.IsTokenValid())
      {
        return Unauthorized();
      }
      if (albumnDto == null)
      {
        return BadRequest();
      }
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      int[] matrix = albumnDto.Position.Split(',').Select(int.Parse).ToArray();
      await _albumnRepository.CreateAlbumnAsync(contentId, matrix, albumnDto.ImageLink);
      return Ok();
    }

    /// <summary>
    /// Create albumn.
    /// </summary>
    [HttpPost("CreateAlbums/{contentId}")]
    [Authorize(Roles = "user, admin")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> CreateAlbumns([FromRoute]int contentId, [FromBody]List<CreateAlbumDto> createAlbumDto)
    {
      if (!_authRepository.IsTokenValid())
      {
        return Unauthorized();
      }

      if (createAlbumDto == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      await _albumService.CreateListAlbumnAsync(contentId, createAlbumDto);
      return Ok();
    }

        /// <summary>
        /// Update albumn.
        /// </summary>
        [HttpPut("{contentId}&{albumnId}")]
        [Authorize(Roles = "user")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UpdateAlbumn([FromRoute] int contentId, [FromRoute] int albumnId, [FromBody] AlbumnDto albumnDto)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }
            if (albumnDto == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!await _albumnRepository.AlbumnExist(albumnDto.Id))
            {
                return BadRequest();
            }

      try
      {
        int[] matrix = albumnDto.Position.Split(',').Select(int.Parse).ToArray();
        await _albumnRepository.UpdateAlbumn(contentId, albumnId, matrix, albumnDto.ImageLink);
        return Ok();
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

        /// <summary>
        /// Delete albumn by Id.
        /// </summary>
        [HttpDelete("{albumnId}")]
        [Authorize]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteAlbumns([FromRoute] int albumnId)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var albumn = await _albumnRepository.GetAlbumnById(albumnId);
            await _albumnRepository.DeleteAlbumn(albumn);
            return Ok(albumn);
        }
    }
}
