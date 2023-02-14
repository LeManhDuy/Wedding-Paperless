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
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST api/auth
        ///     {        
        ///       "UserName": "admin",
        ///       "Password": "123",
        ///       "Role": "Admin"        
        ///     }
        /// </remarks>
        /// <param name="accountDto"></param>       
        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AccountDto>> RegisterAsync([FromBody] AccountDto accountDto)
        {
            if (accountDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _authRepository.RegisterAsync(accountDto);
                return Ok(accountDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}