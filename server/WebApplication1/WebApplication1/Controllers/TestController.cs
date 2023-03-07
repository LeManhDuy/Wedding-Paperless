using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interfaces.IService;
using WebApplication1.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using WebApplication1.Dto;

namespace WebApplication1.Controllers
{
    [Route("")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IEmailRepository _emailRepository;
        private readonly IAccountService _accountService;
        private readonly IPersonRepository _personRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;

        public TestController
        (
            IAccountRepository accountRepository,
            IMapper mapper,
            IPersonRepository personRepository,
            IAccountService accountService,
            IEmailRepository emailRepository,
            IAuthRepository authRepository)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
            _personRepository = personRepository;
            _accountService = accountService;
            _emailRepository = emailRepository;
            _authRepository = authRepository;
        }

        /// <summary>
        /// Get all account.
        /// </summary>
        /// <returns>A list account</returns>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ICollection<AccountDto>>> GetAccounts()
        {
            try
            {

                var accounts = await _accountRepository.GetAccountsAsync();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var accountInfoDto = _mapper.Map<ICollection<AccountInfoDto>>(accounts);

                return Ok(accountInfoDto);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
