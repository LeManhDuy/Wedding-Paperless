using Azure.Core;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using Microsoft.AspNetCore.Routing;
using Duende.IdentityServer.Models;
using WebApplication1.Services;

namespace WebApplication1.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IEmailRepository _emailRepository;
        private readonly LinkGenerator _linkGenerator;
        public AuthRepository(DataContext context, IEmailRepository emailRepository, LinkGenerator linkGenerator)
        {
            _context = context;
            _emailRepository = emailRepository;
            _linkGenerator = linkGenerator;
        }

        public async Task<AccountDto> LoginAsync(AccountDto authAccountDto)
        {
            throw new NotImplementedException();
        }

        public async Task<AuthDto> RegisterAsync(AuthDto authDto)
        {
            try
            {
                authDto.UserName = authDto.UserName.ToLower();

                var currentUser = await _context.Accounts.Where(p => p.UserName.ToLower() == authDto.UserName.ToLower()).FirstOrDefaultAsync();
                if (currentUser != null)
                {
                    throw new Exception("Username is already exist!");
                }

                var currentPerson = await _context.Persons.Where(p => p.Email == authDto.Email && p.EmailConfirmed == false).FirstOrDefaultAsync();
                if (currentPerson != null)
                {
                    throw new Exception("Email is already exist!");
                }

                using var hmac = new HMACSHA512();
                var passwordBytes = Encoding.UTF8.GetBytes(authDto.PassWord);

                var user = new Account
                {
                    UserName = authDto.UserName,
                    PasswordHash = hmac.ComputeHash(passwordBytes),
                    PasswordSalt = hmac.Key,
                    Role = authDto.Role
                };
                await _context.Accounts.AddAsync(user);

                var person = new Person
                {
                    FullName = authDto.FullName,
                    Email = authDto.Email,
                    EmailConfirmed = false,
                    Account = user,
                };
                await _context.Persons.AddAsync(person);
                await _context.SaveChangesAsync();

                var token = _emailRepository.GenerateEmailConfirmToken(person);
                //var confirmationLink = _linkGenerator.GetUriByAction(new { token, email = person.Email });
                //var message = new Message(new string[] { person.Email }, "Confirm", "a");

                Message content = new Message
                {
                    To = person.Email,
                    Subject = "Confirm Link",
                    Body = "<a href='https://localhost:44328/api/email/confirm-email/" + person.Email + "'></a>"
                };

                await _emailRepository.SendEmail(content);
                return authDto;
            }
            catch (Exception ex)
            {
                throw new Exception("Message: " + ex.Message);
            }
        }
    }
}