using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;

namespace WebApplication1.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly DataContext _context;

        public AuthController(IAuthRepository authRepository, DataContext context)
        {
            _authRepository = authRepository;
            _context = context;
        }

        /// <summary>
        /// Register Account.
        /// </summary>
        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AccountDto>> RegisterAsync([FromBody] AuthDto authDto)
        {
            if (authDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _authRepository.RegisterAsync(authDto);
                return Ok(authDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}