using WebApplication1.Dto;
using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IAccountRepository 
    {
        Task<ICollection<AccountInfoDto>> GetAccountsAsync();

        Task<AccountInfoDto> GetAccountByIdAsync(int id);
        Task<Account> GetAccountToSolveByIdAsync(int id);
        Task<bool> UpdateAccountAsync(Account account);

        Task<bool> DeleteAccountByIdAsync(int id);

        Task<bool> AccountExistsAsync(int id);

        Task<bool> SaveChangesAsync();  

        Task<bool> CodeIsExistAsync(string code);
        Task<Account> GetAccountByVerifyCode(string Code); 
    }
}