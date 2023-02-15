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

namespace WebApplication1.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
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

                var currentUser = await _context.Accounts.Where(p => p.UserName == authDto.UserName).FirstOrDefaultAsync();
                if (currentUser != null)
                {
                    throw new Exception("Username is already exist!");
                }

                var currentPerson = await _context.Persons.Where(p => p.Email == authDto.Email && p.EmailConfirmed == true).FirstOrDefaultAsync();
                if (currentPerson != null)
                {
                    throw new Exception("Username is already exist!");
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
                    EmailConfirmed = true,
                    Account = user,
                };
                await _context.Persons.AddAsync(person);

                await _context.SaveChangesAsync();

                return authDto;
            }
            catch (Exception ex)
            {
                throw new Exception("Message: " + ex.Message);
            }
        }
    }
}