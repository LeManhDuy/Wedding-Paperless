using AutoMapper;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Interfaces.IService;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class ContentService : IContentService
    {
        private readonly IMapper _mapper;
        private readonly IPersonRepository _personRepository;
        private readonly IContentRepository _contentRepository;

        public ContentService
        (
            IContentRepository contentRepository,
            IPersonRepository personRepository,
            IMapper mapper
        )
        {
            _mapper = mapper;
            _personRepository = personRepository;
            _contentRepository = contentRepository;
        }
        public async Task<bool> CreateContentAsync(int idPerson, CreateUpdateContentDto contentDto)
        {
            var person = await _personRepository.GetPersonByIdAsync(idPerson);
            var personEmail = await _personRepository.GetPersonByEmailAsync(person.Email);
            if(person == null){
                throw new Exception("Not found");
            }

            var content = _mapper.Map<Content>(contentDto);
            content.Person = personEmail;
            if(!await _contentRepository.CreateContentAsync(content)){
                return false;
            };

            return true;
        }

        public async Task<bool> ExistContentByPersonIdAsync(int personId)
        {   
            return await _contentRepository.ContentIsExistByPersonId(personId);
        }

        public async Task<ContentWithAlbumDto> GetContentWithAlbumAsync(int personId)
        {
            if(! await ExistContentByPersonIdAsync(personId)){
                throw new Exception("Not found");
            }

            var contentWithAlbum = await _contentRepository.GetContentByIdPersonWithAlbumsAsync(personId);

            return _mapper.Map<ContentWithAlbumDto>(contentWithAlbum);

        }
    }
}