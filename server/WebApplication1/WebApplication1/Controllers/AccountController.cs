using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Interfaces.IService;

namespace WebApplication1.Controller
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IEmailRepository _emailRepository;        
        private readonly IAccountService _accountService;
        private readonly IPersonRepository _personRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;

        public AccountController
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
        [Authorize(Roles = "admin")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(ICollection<AccountDto>))]
        public async Task<ActionResult<ICollection<AccountDto>>> GetAccounts()
        {
            try
            {
                if (!_authRepository.IsTokenValid())
                {
                    return Unauthorized();
                }
                
                var accounts = await _accountRepository.GetAccountsAsync();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
            
                var accountInfoDto = _mapper.Map<ICollection<AccountInfoDto>>(accounts);

                return Ok(accountInfoDto);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Delete Account.
        /// </summary>
        /// <param name="accountId">account id</param>     
        [HttpDelete("{accountId}")]
        [Authorize(Roles = "admin")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]   
        public async Task<ActionResult> DeleteAccount(int accountId)
        {
            if (!_authRepository.IsTokenValid())
            {
                return Unauthorized();
            }
            if(!await _accountRepository.AccountExistsAsync(accountId)){
                return NotFound();
            }

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            if(!await _accountRepository.DeleteAccountByIdAsync(accountId)){
                ModelState.AddModelError("", "Something went wrong deleting category");
            }

            return Ok();
        }

        /// <summary>
        /// Checking code is verified or not.
        /// </summary>
        /// <param name="code">code</param>     
        [HttpPost("validateCode/{code}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200)]
        public async Task<ActionResult> ValidateCode(string code)
        {
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            if(!await _accountRepository.CodeIsExistAsync(code)){
                return NotFound();
            }

            return Ok();
        }

        /// <summary>
        /// Get verify code to reset password.
        /// </summary>
        [HttpPost("forgotPassword/{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            var person = await _personRepository.GetPersonByEmailAsync(email);
            
            if(person == null){
                return NotFound();
            }

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            if(!await _accountService.ForgotPasswordAsync(person.Account)){
                ModelState.AddModelError("", "Something went wrong"); 
            };

            var content = _accountService.CreateMessage(person);
            await _emailRepository.SendEmail(content);
            return Ok();
        } 

        /// <summary>
        /// Count acccount by Date.
        /// </summary>  
        /// <returns>Numb Of Account</returns>
        [HttpGet("count-account-by-datetime")]
        //[Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DateTimeDto>> CountContentsByDateTime()
        {
            // if (!_authRepository.IsTokenValid())
            // {
            //     return Unauthorized();
            // }
            var dateTimeDto = await _accountRepository.CountAccountsByDateTime();
            if (dateTimeDto == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            return Ok(dateTimeDto);
        }
        
        /// <summary>
        /// Reset password with verify code.
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST api/ResetPassword
        ///     { 
        ///       "code": "567842"         
        ///       "password": "12345",
        ///       "confirmPassword": "12345",      
        ///     }
        /// </remarks>
        [HttpPost("resetPassword")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> ResetPassword([FromBody]ForgotPasswordDto forgotPasswordDto)
        {
            var account = await _accountRepository.GetAccountByVerifyCode(forgotPasswordDto.Code);
            if(account == null || account.CodeExpries < DateTime.Now){
                return BadRequest("Invalid code");
            }

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            if(!await _accountService.UpdatePasswordAsync(forgotPasswordDto, account)){
                ModelState.AddModelError("", "Something went wrong when updating account"); 
            };

            return Ok();
        }

        /// <summary>
        /// Update patch json.
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST 1/patchAccount
        ///     [
        ///       {
        ///         "path": "/username",
        ///         "op": "replace",
        ///         "value": "new name"
        ///       }
        ///     ]
        /// </remarks>
        [HttpPatch("{id}/patchAccount")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> PatchAccount(int id, [FromBody] JsonPatchDocument<UpdateAccountDto> patchDoc)
        {
            if (patchDoc != null)
            {
                var account = await _accountRepository.GetAccountToSolveByIdAsync(id);
                var updateAccountDto = _mapper.Map<UpdateAccountDto>(account);

                patchDoc.ApplyTo(updateAccountDto, ModelState);

                account.UserName = updateAccountDto.UserName;
                account.Role = updateAccountDto.Role;

                if(updateAccountDto.Password != null){
                    var hashPassword = _accountService.ConvertPasswordToHash(updateAccountDto.Password);
                    account.PasswordHash = hashPassword.PasswordHash;
                    account.PasswordSalt = hashPassword.PasswordSalt;
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if(!await _accountRepository.UpdateAccountAsync(account)){
                    ModelState.AddModelError("", "Something went wrong updating account");                    
                } 
                   
                return Ok();
            }

            return BadRequest(ModelState);
        } 
    }
}