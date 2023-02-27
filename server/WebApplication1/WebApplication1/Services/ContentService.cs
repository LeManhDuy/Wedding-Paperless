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
            if(person == null){
                throw new Exception("Not found");
            }

            var content = _mapper.Map<Content>(contentDto);
            content.Person = person;
            if(!await _contentRepository.CreateContentAsync(content)){
                return false;
            };

            return true;
        }
    }
}