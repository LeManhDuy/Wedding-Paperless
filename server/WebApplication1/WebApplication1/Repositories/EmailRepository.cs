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
        public EmailRepository(EmailConfiguration emailConfiguration, DataContext context)
        {
            _emailConfiguration = emailConfiguration;
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
                }
                catch (Exception ex)
                {
                    throw new ArgumentException("Can't send email!", ex);
                }
            }
        }
    }
}
