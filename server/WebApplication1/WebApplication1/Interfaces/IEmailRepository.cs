using WebApplication1.Services;

namespace WebApplication1.Interfaces
{
    public interface IEmailRepository
    {
        void SendEmail(Message message);
    }
}
