using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Interfaces
{
    public interface IEmailRepository
    {
        string GenerateEmailConfirmToken(Person person);
        Task ConfirmEmail(string email);
        Task<Account> FindByEmailAsync(string email);
        Task SendEmail(Message message);

        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
