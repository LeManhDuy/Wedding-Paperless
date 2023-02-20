using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Interfaces
{
    public interface IEmailRepository
    {
        string GenerateEmailConfirmToken(Person person);
        Task ConfirmEmail(string emailToken);
        Task SendEmail(Message message);
    }
}
