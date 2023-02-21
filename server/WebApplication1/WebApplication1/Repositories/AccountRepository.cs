using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _context;
        public AccountRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AccountExistsAsync(int id)
        {
            return await _context.Accounts.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> CodeIsExistAsync(string code)
        {
            return await _context.Accounts.AnyAsync(p => p.Code == code);
        }

        public async Task<bool> DeleteAccountByIdAsync(int id)
        {
            var account = await GetAccountByIdAsync(id);
            if(account == null){
                return false;
            }
            _context.Accounts.Remove(account);
            return await SaveChangesAsync();
        }

        public async Task<Account> GetAccountByIdAsync(int id)
        {
            return await _context.Accounts.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Account> GetAccountByVerifyCode(string Code)
        {
           return await _context.Accounts.Where(p => p.Code == Code).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Account>> GetAccountsAsync()
        {
            return await _context.Accounts.AsNoTracking().ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAccountAsync(Account account)
        {
            _context.Accounts.Update(account);
            return await SaveChangesAsync();
        }

    }
}