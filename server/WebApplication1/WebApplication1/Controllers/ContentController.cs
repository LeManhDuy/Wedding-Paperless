using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Interfaces.IService;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/content")]
    public class ContentController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;
        private readonly IContentRepository _contentRepository;
        private readonly IContentService _contentService;
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;

        public ContentController(IPersonRepository personRepository, IMapper mapper,
            IContentRepository contentRepository, IContentService contentService, IAuthRepository authRepository)
        {
            _personRepository = personRepository;
            _mapper = mapper;
            _contentRepository = contentRepository;
            _contentService = contentService;
            _authRepository = authRepository;
        }

        /// <summary>
        /// Get all content.
        /// </summary>
        /// <returns>A list content</returns>
        [Authorize]
        [HttpGet()]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(ICollection<ContentDto>))]
        public async Task<ActionResult<ICollection<ContentDto>>> GetContents()
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            var content = await _contentRepository.GetContentsAsync();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var contentDto = _mapper.Map<ICollection<ContentDto>>(content);

            return Ok(contentDto);
        }

        /// <summary>
        /// Get content by id.
        /// </summary>
        /// <param name="contentId">content id</param>   
        /// <returns>A content</returns>
        [HttpGet("{contentId}")]
        [Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(ContentDto))]
        public async Task<ActionResult<ContentDto>> GetContentById(int contentId)
        {
            // if (!_authRepository.IsTokenValid())
            // {
            //     return Unauthorized();
            // }
            var content = await _contentRepository.GetContentByIdAsync(contentId);
            if (content == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var contentDto = _mapper.Map<ContentDto>(content);

            return Ok(contentDto);
        }


        /// <summary>
        /// Count contents by Date.
        /// </summary>
        /// <returns>Numb Of Contents</returns>
        [HttpGet("count-contents-by-datetime")]
        //[Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(ContentWithAlbumDto))]
        public async Task<ActionResult<DateTimeDto>> CountContentsByDateTime()
        {
            // if (!_authRepository.IsTokenValid())
            // {
            //     return Unauthorized();
            // }
            var dateTimeDto = await _contentRepository.CountContentsByDateTime();
            if (dateTimeDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(dateTimeDto);
        }

        /// <summary>
        /// Get albumn by content id.
        /// </summary>
        /// <param name="contentId">content id</param>
        /// <returns>A content</returns>
        [HttpGet("{contentId}/albumn")]
        [Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(ContentDto))]
        public async Task<ActionResult<ContentDto>> GetAlbumnContent(int contentId)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            var albumns = await _contentRepository.GetAlbumnContentAsync(contentId);
            if (albumns == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(albumns);
        }

        /// <summary>
        /// Get song by content id.
        /// </summary>
        /// <param name="contentId">content id</param>
        /// <returns> songs</returns>
        [HttpGet("{contentId}/song")]
        [Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(ContentDto))]
        public async Task<ActionResult<ContentDto>> GetSongContent(int contentId)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            var songs = await _contentRepository.GetSongContentAsync(contentId);
            if (songs == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(songs);
        }

        /// <summary>
        /// Get content by person id attach albums.
        /// </summary>
        /// <param name="personId">content id</param>
        /// <returns>A content</returns>
        [HttpGet("getContentAttachAlbums/{personId}")]
        [Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(ContentWithAlbumDto))]
        public async Task<ActionResult<ContentWithAlbumDto>> GetContentByPersonIdAttachAlbums(int personId)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            var content = await _contentService.GetContentWithAlbumAsync(personId);
            if (content == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(content);
        }

        /// <summary>
        /// Delete content by id.
        /// </summary>
        /// <param name="contentId">content id</param>
        [HttpDelete("{contentId}")]
        [Authorize]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> DeleteContent(int contentId)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            if (!await _contentRepository.ContentExistAsync(contentId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _contentRepository.DeleteContentAsync(contentId))
            {
                ModelState.AddModelError("", "Something went wrong deleting content");
            }

            return NoContent();
        }

        /// <summary>
        /// Check content is exist by person id
        /// </summary>
        /// <param name="personId">person id</param>
        [HttpGet("checkContentByPersonId/{personId}")]
        [Authorize]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<bool>> CheckContentByPersonId(int personId)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _contentService.ExistContentByPersonIdAsync(personId));
        }

        /// <summary>
        /// Create content.
        /// </summary>
        [HttpPost("{personId}")]
        [Authorize(Roles = "user")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(ContentDto))]
        public async Task<ActionResult<ContentDto>> CreateContent(int personId,
            [FromBody] CreateUpdateContentDto createUpdateContentDto)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            if (createUpdateContentDto == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _personRepository.PersonIsExistsAsync(personId))
            {
                return NotFound();
            }

            if (!await _contentService.CreateContentAsync(personId, createUpdateContentDto))
            {
                ModelState.AddModelError("", "Something went wrong when creating content");
            }

            ;
            var content = await _contentRepository.GetContentByIdPersonAsync(personId);
            return Ok(_mapper.Map<ContentDto>(content));
        }

        /// <summary>
        /// Update Content.
        /// </summary>
        [HttpPut("{contentId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ContentDto>> UpdateAsync([FromRoute] int contentId, [FromBody] ContentDto contentDto)
        {
            if (contentDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = await _contentRepository.UpdateAsync(contentId, contentDto);
               
                return Ok(_mapper.Map<ContentDto>(data));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Update patch json for content.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST 1/patchAccount
        ///     [
        ///       {
        ///         "path": "/hostName",
        ///         "op": "replace",
        ///         "value": "new name"
        ///       }
        ///     ]
        /// </remarks>
        [HttpPatch("{id}/patchContent")]
        [Authorize(Roles = "user")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> PatchContent(int id,
            [FromBody] JsonPatchDocument<CreateUpdateContentDto> patchDoc)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }

            if (patchDoc != null)
            {
                var content = await _contentRepository.GetContentByIdAsync(id);
                var contentDto = _mapper.Map<CreateUpdateContentDto>(content);

                patchDoc.ApplyTo(contentDto, ModelState);

                content.HostName = contentDto.HostName;
                content.Date = contentDto.Date;
                content.Address = contentDto.Address;
                content.Story = contentDto.Story;
                content.Wish = contentDto.Wish;

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!await _contentRepository.UpdateContentAsync(content))
                {
                    ModelState.AddModelError("", "Something went wrong updating content");
                }

                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}