using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Dto;
using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IAuthRepository
    {
        Task<TokenAccountDto> LoginAsync(AccountDto authAccountDto);
        Task<bool> CheckAccountAsync(AccountDto authAccountDto);
        Task<AuthDto> RegisterAsync(AuthDto authDto);
        string GenerateToken(Account account);
        public bool IsTokenValid();
        Task<AuthDto> LogoutAsync();
        string GetCurrentToken();
        Task<bool> IsConfirmedEmail(string email);
    }
}