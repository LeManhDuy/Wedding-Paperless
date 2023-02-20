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
            try
            {
                Account currentUser = null;
                authAccountDto.UserName = authAccountDto.UserName.ToLower();
                currentUser = await _context.Accounts.FirstOrDefaultAsync(a =>
                    a.UserName == authAccountDto.UserName || a.Email == authAccountDto.UserName);
                if (currentUser == null)
                {
                    var checkAccount = await _context.Persons.FirstOrDefaultAsync(p => p.Email == authAccountDto.UserName);
                    currentUser = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == checkAccount.Id);
                    if (currentUser == null)
                    {
                        throw new Exception("User not found");
                    }
                }
                using var hmac = new HMACSHA512(currentUser.PasswordSalt);
                var passwordBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(authAccountDto.PassWord));
                for (int i = 0; i < currentUser.PasswordHash.Length; i++)
                {
                    if (currentUser.PasswordHash[i] != passwordBytes[i])
                    {
                        return null;
                    }
                }

                return authAccountDto;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception();
            }
        }

        public async Task<AuthDto> RegisterAsync(AuthDto authDto)
        {
            try
            {
                authDto.UserName = authDto.UserName.Trim().ToLower();

                // Check if username already exists
                var currentUser = await _context.Accounts.FirstOrDefaultAsync(p => p.UserName.ToLower() == authDto.UserName);
                if (currentUser != null)
                {
                    throw new Exception("Username is already taken!");
                }

                // Check if email already exists and not yet confirmed
                var currentPerson = await _context.Persons.FirstOrDefaultAsync(p => p.Email == authDto.Email && p.EmailConfirmed == false);
                if (currentPerson != null)
                {
                    throw new Exception("Email is already registered but not yet confirmed. Please check your email for the confirmation link.");
                }

                // Hash the password and create new account
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

                // Create new person and associate with the account
                var person = new Person
                {
                    FullName = authDto.FullName,
                    Email = authDto.Email.Trim(),
                    EmailConfirmed = false,
                    EmailVerifiedAt = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                    Account = user,
                };
                await _context.Persons.AddAsync(person);
                await _context.SaveChangesAsync();

                // Generate email confirmation token and send email
                var emailToken = _emailRepository.GenerateEmailConfirmToken(person);
                var confirmationLink = "https://localhost:44328/api/email/confirm/" + emailToken;
                var content = new Message
                {
                    To = person.Email,
                    Subject = "Confirm your email address",
                    Body = $"<p>Hello {person.FullName},</p><p>Please click the link below to confirm your email address:</p><p><a href='{confirmationLink}'>{confirmationLink}</a></p>"
                };
                await _emailRepository.SendEmail(content);

                return authDto;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to register user. " + ex.Message);
            }
        }
    }
}