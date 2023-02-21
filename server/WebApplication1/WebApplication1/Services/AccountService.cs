using System.Security.Cryptography;
using System.Text;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Interfaces.IService;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class AccountService : IAccountService
    {
        private readonly IEmailRepository _emailRepository;
        private readonly IAccountRepository _accountRepository;
        public AccountService
        (
            IAccountRepository accountRepository,
            IEmailRepository emailRepository
        )
        {
            _accountRepository = accountRepository;
            _emailRepository = emailRepository;
        }

        public PasswordDto ConvertPasswordToHash(string password)
        {
            using var hmac = new HMACSHA512();
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            
            return new PasswordDto(){
                PasswordHash = hmac.ComputeHash(passwordBytes),
                PasswordSalt = hmac.Key
            };
        }

        public Message CreateMessage(Person person)
        {
            var account = person.Account;

            if(account.Code == null || account.CodeExpries < DateTime.Now){
                throw new Exception("Verify Code is empty or code is expried");
            }

            var emailToken = _emailRepository.GenerateEmailConfirmToken(person);

            var content = new Message
            {
                To = person.Email,
                Subject = "Your verify code",
                Body = $"<p>Hello {person.FullName},</p><p>Here is your verify code</p><p>{account.Code}</p>"
            };
            return content;
        }

        public async Task<bool> ForgotPasswordAsync(Account account)
        {
            account.Code =await GenerateVerifyCodeAsync();
            account.CodeExpries = DateTime.Now.AddMinutes(15);
            return await _accountRepository.UpdateAccountAsync(account);
        }

        public async Task<string> GenerateVerifyCodeAsync()
        {
            Random random = new Random();
            string randomNumber = random.Next(100000, 999999).ToString();

            if(await _accountRepository.CodeIsExistAsync(randomNumber)){
                return await GenerateVerifyCodeAsync();
            }

            return randomNumber;
        }

        public async Task<bool> UpdatePasswordAsync(ForgotPasswordDto forgotPasswordDto, Account account)
        {
            var password = forgotPasswordDto.Password;
            var confirmPassword = forgotPasswordDto.ConfirmPassword;
            if(password != confirmPassword){
                throw new Exception("ConfirmPassword didn't match");
            }

            var passwordDto = ConvertPasswordToHash(forgotPasswordDto.Password);
            account.PasswordHash = passwordDto.PasswordHash;
            account.PasswordSalt = passwordDto.PasswordSalt;
            account.Code = null;
            account.CodeExpries = DateTime.MinValue;
            
            return await _accountRepository.UpdateAccountAsync(account);
        }
    }
}