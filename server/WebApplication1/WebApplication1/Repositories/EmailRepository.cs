using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Net.Mail;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Repositories
{
    public class EmailRepository : IEmailRepository
    {
        private readonly EmailConfiguration _emailConfiguration;
        private readonly DataContext _context;
        private readonly ILogger<EmailRepository> logger;
        public EmailRepository(EmailConfiguration emailConfiguration, ILogger<EmailRepository> _logger, DataContext context)
        {
            _emailConfiguration = emailConfiguration;
            logger = _logger;
            logger.LogInformation("Create SendMailService");
            _context = context;
        }

        public async Task ConfirmEmail(string email)
        {

            var person = await _context.Persons.Where(p => p.Email == email && p.EmailConfirmed == false).FirstOrDefaultAsync();
            if (person == null)
                throw new Exception("Person not found!");


            person.EmailConfirmed = true;
            _context.Persons.Update(person);
            await _context.SaveChangesAsync();
        }

        public async Task<Account> FindByEmailAsync(string email)
        {
            return await _context.Accounts.FirstOrDefaultAsync(p => p.Email == email);
        }

        public string GenerateEmailConfirmToken(Person person)
        {

            var plainTextBytes = Encoding.UTF8.GetBytes(person.Email + DateTime.Now);
            return Convert.ToBase64String(plainTextBytes);
        }

        public async Task SendEmail(Message message)
        {
            var email = new MimeMessage();
            email.Sender = new MailboxAddress(_emailConfiguration.UserName, _emailConfiguration.From);
            email.From.Add(new MailboxAddress(_emailConfiguration.UserName, _emailConfiguration.UserName));
            email.To.Add(MailboxAddress.Parse(message.To));
            email.Subject = message.Subject;


            var builder = new BodyBuilder();
            builder.HtmlBody = message.Body;
            email.Body = builder.ToMessageBody();

            // dùng SmtpClient của MailKit
            using var smtp = new MailKit.Net.Smtp.SmtpClient();

            try
            {
                smtp.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                smtp.Authenticate(_emailConfiguration.From, _emailConfiguration.Password);
                await smtp.SendAsync(email);
            }
            catch (Exception ex)
            {
                // Gửi mail thất bại, nội dung email sẽ lưu vào thư mục mailssave
                System.IO.Directory.CreateDirectory("mailssave");
                var emailsavefile = string.Format(@"mailssave/{0}.eml", Guid.NewGuid());
                await email.WriteToAsync(emailsavefile);

                logger.LogInformation("Lỗi gửi mail, lưu tại - " + emailsavefile);
                logger.LogError(ex.Message);
            }

            smtp.Disconnect(true);

            logger.LogInformation("send mail to " + message.To);

        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            await SendEmail(new Message()
            {
                To = email,
                Subject = subject,
                Body = htmlMessage
            });
        }



        //public void SendEmail(Message message)
        //{
        //    var emailMessage = CreateEmailMessage(message);
        //    Send(emailMessage);
        //}

        //private MimeMessage CreateEmailMessage(Message message)
        //{
        //    var emailMessage = new MimeMessage();
        //    emailMessage.From.Add(new MailboxAddress("email", _emailConfiguration.From));
        //    emailMessage.To.AddRange(message.To);
        //    emailMessage.Subject = message.Subject;
        //    emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };
        //    emailMessage.Sender = new MailboxAddress("email", _emailConfiguration.From);

        //    return emailMessage;
        //}
        //private void Send(MimeMessage mailMessage)
        //{
        //    using var client = new MailKit.Net.Smtp.SmtpClient();
        //    try
        //    {
        //        client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
        //        client.AuthenticationMechanisms.Remove("XOAUTH2");
        //        client.Authenticate(_emailConfiguration.UserName, _emailConfiguration.Password);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Message: " + ex.Message);
        //    }
        //    finally
        //    {
        //        client.Disconnect(true);
        //        client.Dispose();
        //    }
        //}
    }
}
