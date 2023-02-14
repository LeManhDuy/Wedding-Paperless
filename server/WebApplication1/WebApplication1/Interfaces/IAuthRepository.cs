using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Dto;

namespace WebApplication1.Interfaces
{
  public interface IAuthRepository
  {
    Task<AccountDto> LoginAsync(AccountDto authAccountDto);
    Task<AccountDto> RegisterAsync(AccountDto authAccountDto);
  }
}