using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AccountRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
            var account = await _context.Accounts.FirstOrDefaultAsync(p => p.Id == id);
            if(account == null){
                return false;
            }
            _context.Accounts.Remove(account);
            return await SaveChangesAsync();
        }

        public async Task<AccountInfoDto> GetAccountByIdAsync(int id)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(p => p.Id == id);
            var person = await _context.Persons.FirstOrDefaultAsync(p => p.Id == account.Id);
            var accountInfo = _mapper.Map<AccountInfoDto>(account);
            accountInfo.Email = person.Email;
            accountInfo.Avatar = person.Avatar;
            accountInfo.Fullname = person.FullName;
            return accountInfo;
        }

        public async Task<Account> GetAccountToSolveByIdAsync(int id)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(p => p.Id == id);
            return account;
        }

        public async Task<Account> GetAccountByVerifyCode(string code)
        {
           return await _context.Accounts.Where(p => p.Code == code).FirstOrDefaultAsync();
        }

        public async Task<ICollection<AccountInfoDto>> GetAccountsAsync()
        {
            var accountInfos = new List<AccountInfoDto>();
            var accounts = await _context.Accounts.AsNoTracking().ToListAsync();
            foreach (var account in accounts)
            {
                var person = await _context.Persons.FirstOrDefaultAsync(p => p.Id == account.Id);
                var accountInfo = _mapper.Map<AccountInfoDto>(account);
                accountInfo.Email = person.Email;
                accountInfo.Avatar = person.Avatar;
                accountInfo.Fullname = person.FullName;
                accountInfos.Add(accountInfo);
            }
            return accountInfos;
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