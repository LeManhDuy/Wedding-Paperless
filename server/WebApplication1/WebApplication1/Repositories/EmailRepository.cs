using MailKit.Net.Smtp;
using MimeKit;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Repositories
{
    public class EmailRepository : IEmailRepository
    {
        private readonly EmailConfiguration _emailConfiguration;
        public EmailRepository(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }
        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("email", _emailConfiguration.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };

            return emailMessage;
        }
        private void Send(MimeMessage mailMessage)
        {
            using var client = new SmtpClient();
            try
            {
                client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfiguration.UserName, _emailConfiguration.Password);
            }
            catch (Exception ex)
            {
                throw new Exception("Message: " + ex.Message);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}
