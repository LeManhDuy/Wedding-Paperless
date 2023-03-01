using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication1.Dto;
using WebApplication1.Models;

namespace WebApplication1.Helper
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Account, AccountDto>();
      CreateMap<AccountDto, Account>();
      CreateMap<Account, AccountInfoDto>();
      CreateMap<AccountInfoDto, Account>();
      
      CreateMap<Account, UpdateAccountDto>();
      CreateMap<UpdateAccountDto, Account>();

      CreateMap<Albumn, AlbumnDto>();
      CreateMap<AlbumnDto, Albumn>();

      CreateMap<Content, ContentDto>();
      CreateMap<ContentDto, Content>();

      CreateMap<Person, PersonDto>();
      CreateMap<PersonDto, Person>();

      CreateMap<RegisterSong, RegisterSongDto>();
      CreateMap<RegisterSongDto, RegisterSong>();

      CreateMap<Content, ContentDto>();
      CreateMap<ContentDto, Content>();
      CreateMap<CreateUpdateContentDto, Content>();
      CreateMap<Content, CreateUpdateContentDto>();
    }
  }
}