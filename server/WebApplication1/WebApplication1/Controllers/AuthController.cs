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
        /// Login Account.
        /// </summary>
        [HttpPost("login")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LoginAsync([FromBody] AccountDto accountDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (accountDto == null)
            {
                return BadRequest();
            }

            try
            {
                var token = await _authRepository.LoginAsync(accountDto);
                if (token == null)
                {
                    BadRequest();
                }
                else
                {
                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = true,
                        Expires = DateTime.Now.AddMinutes(2)
                    };
                    Response.Cookies.Append("refreshToken", token!.Token, cookieOptions);
                }
                return Ok(token!);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Login Account.
        /// </summary>
        [HttpPost("verify")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> VerifyAsync([FromBody] AccountDto accountDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (accountDto == null)
            {
                return BadRequest();
            }

            try
            {
                var token = await _authRepository.CheckAccountAsync(accountDto);
                if (!token)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
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
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// Logout
        /// </summary>
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogoutAsync()
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }
            // L???y ra jwt token trong request header
            // Hu??? token trong b??? nh??? cache ho???c trong c?? s??? d??? li???u
            var token = _authRepository.GetCurrentToken();
            return Ok(token);
        }

        /// <summary>
        /// Check email confirm
        /// </summary>
        [HttpPost("check")]
        public async Task<IActionResult> CheckEmailConfirm([FromBody] string email)
        {
            return Ok(await _authRepository.IsConfirmedEmail(email));
        }
    }
}