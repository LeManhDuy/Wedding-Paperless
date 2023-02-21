using WebApplication1.Dto;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Interfaces.IService
{
    public interface IAccountService
    {
        Task<bool> ForgotPasswordAsync(Account account);

        Message CreateMessage(Person person);

        Task<string> GenerateVerifyCodeAsync();

        Task<bool> UpdatePasswordAsync(ForgotPasswordDto forgotPasswordDto, Account account);

        PasswordDto ConvertPasswordToHash(string password);

    }
}