using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Globalization;
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

        public async Task ConfirmEmail(string emailToken)
        {
            try
            {
                byte[] data = Convert.FromBase64String(emailToken);
                string normalString = Encoding.UTF8.GetString(data);

                string[] parts = normalString.Split('&');
                if (parts.Length != 2)
                    throw new ArgumentException("Invalid email token format!");

                string normalEmail = parts[0];
                string normalDateString = parts[1];

                var person = await _context.Persons
                    .Where(p => p.Email == normalEmail && !p.EmailConfirmed)
                    .FirstOrDefaultAsync();

                if (person == null)
                    throw new Exception("Person not found!");

                DateTime normalDate = DateTime.ParseExact(normalDateString, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);

                if (normalDate > DateTime.Now.AddMinutes(15))
                    throw new Exception("Token has expired!");

                if (normalDate < DateTime.Now.AddMinutes(-15))
                    throw new Exception("Token is not valid yet!");

                person.EmailConfirmed = true;
                person.EmailVerifiedAt = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                _context.Persons.Update(person);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Invalid email token!", ex);
            }
        }

        public string GenerateEmailConfirmToken(Person person)
        {
            try
            {
                if (person == null)
                {
                    throw new ArgumentException("Invalid person!");
                }

                var plainTextBytes = Encoding.UTF8.GetBytes(person.Email + "&" + person.EmailVerifiedAt);
                return Convert.ToBase64String(plainTextBytes);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Invalid person!", ex);
            }
        }

        public async Task SendEmail(Message message)
        {
            //test comment
            var email = new MimeMessage();
            email.Sender = new MailboxAddress(_emailConfiguration.UserName, _emailConfiguration.From);
            email.From.Add(new MailboxAddress(_emailConfiguration.UserName, _emailConfiguration.UserName));
            email.To.Add(MailboxAddress.Parse(message.To));
            email.Subject = message.Subject;


            var builder = new BodyBuilder();
            builder.HtmlBody = message.Body;
            email.Body = builder.ToMessageBody();

            using (var smtp = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    smtp.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                    smtp.Authenticate(_emailConfiguration.From, _emailConfiguration.Password);
                    await smtp.SendAsync(email);

                    // Log successful email sending
                    logger.LogInformation($"Email sent to {message.To}: {message.Subject}");
                }
                catch (Exception ex)
                {
                    // Log error and save email to disk
                    logger.LogError(ex, $"Failed to send email to {message.To}: {message.Subject}");
                    System.IO.Directory.CreateDirectory("mailssave");
                    var emailsavefile = string.Format(@"mailssave/{0}.eml", Guid.NewGuid());
                    await email.WriteToAsync(emailsavefile);
                    logger.LogInformation($"Email saved to {emailsavefile}");
                }
            }
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
