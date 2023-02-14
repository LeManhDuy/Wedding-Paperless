using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;

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

    public async Task<AccountDto> RegisterAsync(AccountDto authAccountDto)
    {
      throw new NotImplementedException();
    }
  }
}