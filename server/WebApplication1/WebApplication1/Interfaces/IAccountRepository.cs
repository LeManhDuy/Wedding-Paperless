using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IAccountRepository 
    {
        Task<ICollection<Account>> GetAccountsAsync();

        Task<Account> GetAccountByIdAsync(int id);

        Task<bool> UpdateAccountAsync(Account account);

        Task<bool> DeleteAccountByIdAsync(int id);

        Task<bool> AccountExistsAsync(int id);

        Task<bool> SaveChangesAsync();  

        Task<bool> CodeIsExistAsync(string code);
        Task<Account> GetAccountByVerifyCode(string Code); 
    }
}