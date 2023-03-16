using Azure.Core;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Models;
using Microsoft.AspNetCore.Routing;
using Duende.IdentityServer.Models;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Services;

namespace WebApplication1.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IEmailRepository _emailRepository;
        private readonly LinkGenerator _linkGenerator;
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthRepository(DataContext context, IEmailRepository emailRepository, LinkGenerator linkGenerator,
            IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _emailRepository = emailRepository;
            _linkGenerator = linkGenerator;
            _config = config;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<TokenAccountDto> LoginAsync(AccountDto authAccountDto)
        {
            try
            {
                Account currentUser;
                authAccountDto.UserName = authAccountDto.UserName.ToLower();
                currentUser = await _context.Accounts.FirstOrDefaultAsync(a =>
                    a.UserName == authAccountDto.UserName || a.Email == authAccountDto.UserName);
                if (currentUser == null)
                {
                    var checkAccount =
                        await _context.Persons.FirstOrDefaultAsync(p => p.Email == authAccountDto.UserName);
                    if (checkAccount == null)
                    {
                        Console.WriteLine("User not found");
                        throw new Exception("User not found");
                    }

                    currentUser = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == checkAccount.Id);
                    if (currentUser == null)
                    {
                        Console.WriteLine("User not found");
                        throw new Exception("User not found");
                    }
                }
                var person = await _context.Persons.FirstOrDefaultAsync(p => p.Id == currentUser.Id);
                if (!await IsConfirmedEmail(person.Email))
                {
                    Console.WriteLine("User not confirmed");
                    throw new Exception("Thang ngu check email di");
                }
                
                using var hmac = new HMACSHA512(currentUser.PasswordSalt);
                var passwordBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(authAccountDto.PassWord));
                for (int i = 0; i < currentUser.PasswordHash.Length; i++)
                {
                    if (currentUser.PasswordHash[i] != passwordBytes[i])
                    {
                        Console.WriteLine("Password mismatch");
                        throw new Exception();
                    }
                }

                Console.WriteLine(authAccountDto.Role);

                var token = GenerateToken(currentUser);
                Console.WriteLine(token);
                var result = new TokenAccountDto()
                {
                    Token = token,
                    Username = authAccountDto.UserName,
                };

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception(e.Message);
            }
        }
        public async Task<bool> CheckAccountAsync(AccountDto authAccountDto)
        {
            try
            {
                Account currentUser;
                authAccountDto.UserName = authAccountDto.UserName.ToLower();
                currentUser = await _context.Accounts.FirstOrDefaultAsync(a =>
                    a.UserName == authAccountDto.UserName || a.Email == authAccountDto.UserName);
                if (currentUser == null)
                {
                    var checkAccount =
                        await _context.Persons.FirstOrDefaultAsync(p => p.Email == authAccountDto.UserName);
                    if (checkAccount == null)
                    {
                        Console.WriteLine("User not found");
                        return false;
                    }

                    currentUser = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == checkAccount.Id);
                    if (currentUser == null)
                    {
                        Console.WriteLine("User not found");
                        return false;
                    }
                }
                return true;
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
                // Check if username already exists
                var currentUser =
                    await _context.Accounts.FirstOrDefaultAsync(p =>
                        p.UserName.ToLower() == authDto.UserName.ToLower());
                if (currentUser != null)
                {
                    throw new Exception("Username is already taken!");
                }
                using var hmac = new HMACSHA512();
                // Check if email already exists and not yet confirmed
                var currentPerson =
                    await _context.Persons.FirstOrDefaultAsync(p =>
                        p.Email == authDto.Email);
                if (!currentPerson.EmailConfirmed)
                {
                    currentUser.UserName = authDto.UserName;
                    currentUser.PasswordHash = Encoding.UTF8.GetBytes(authDto.PassWord);
                    currentUser.PasswordSalt = hmac.Key;
                    currentPerson.FullName = authDto.FullName;
                    currentPerson.EmailVerifiedAt = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                    _context.Persons.Update(currentPerson);
                    _context.Accounts.Update(currentUser);
                    await _context.SaveChangesAsync();
                    
                    var emailTk = _emailRepository.GenerateEmailConfirmToken(currentPerson);
                    var confirmationLinkUrl = _config["Url"] + "api/email/confirm/" + emailTk;
                    var message = new Message
                    {
                        To = currentPerson.Email,
                        Subject = "Confirm your email address",
                        Body =
                            $"<p>Hello {currentPerson.FullName},</p><p><b>Please click the link below to confirm your email address:</b></p><p><a href='{confirmationLinkUrl}'>{confirmationLinkUrl}</a></p>"
                    };
                    await _emailRepository.SendEmail(message);
                    throw new Exception(
                        "Email is already registered but not yet confirmed. Please check your email for the confirmation link.");
                }
                else
                {
                    throw new Exception("Email is already registered");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to register user. " + ex.Message);
            }
        }

        public Task<AuthDto> LogoutAsync()
        {
            throw new NotImplementedException();
        }

        //Token
        public string GenerateToken(Account account)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, account.Id.ToString()),
                new Claim(ClaimTypes.Role, account.Role),
                new Claim(ClaimTypes.Name, account.UserName),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["JWT:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool IsTokenValid()
        {
            var token = _httpContextAccessor.HttpContext!.Request.Headers["authorization"].Single().Split(" ").Last();
            JwtSecurityToken jwtSecurityToken;
            try
            {
                jwtSecurityToken = new JwtSecurityToken(token);
            }
            catch (Exception)
            {
                return false;
            }

            return jwtSecurityToken.ValidTo > DateTime.UtcNow;
        }

        public string GetCurrentToken()
        {
            string token = string.Empty;

            // Lấy token từ header hoặc cookie của request
            var authorizationHeader = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"];
            if (!string.IsNullOrEmpty(authorizationHeader))
            {
                token = authorizationHeader.ToString()!.Replace("Bearer ", string.Empty);
            }
            else
            {
                var cookie = _httpContextAccessor.HttpContext?.Request.Cookies["token"];
                if (cookie != null)
                {
                    token = cookie;
                    // _httpContextAccessor.HttpContext?.Response.Cookies.Delete();
                }
            }

            Console.WriteLine(token);
            return token;
        }

        public async Task<bool> IsConfirmedEmail(string email)
        {
            return await _context.Persons.AnyAsync(x => x.Email == email && x.EmailConfirmed); 
        }
    }
}