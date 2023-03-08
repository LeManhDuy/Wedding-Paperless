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
      CreateMap<Content, ContentWithAlbumDto>()
      .ForMember(x => x.AlbumnDtos, y => y.MapFrom(src => src.Albumns));

      CreateMap<Person, PersonDto>();
      CreateMap<PersonDto, Person>();
      CreateMap<PersonDto, UpdatePersonDto>();
      CreateMap<Person, UpdatePersonDto>();
      CreateMap<UpdatePersonDto, Person>();
      CreateMap<UpdatePersonDto, PersonDto>();

      CreateMap<RegisterSong, RegisterSongDto>();
      CreateMap<RegisterSongDto, RegisterSong>();

      CreateMap<Content, ContentDto>();
      CreateMap<ContentDto, Content>();
      CreateMap<CreateUpdateContentDto, Content>();
      CreateMap<Content, CreateUpdateContentDto>();
    }
  }
}