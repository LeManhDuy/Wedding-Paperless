using WebApplication1.Dto;

namespace WebApplication1.Interfaces.IService
{
    public interface IContentService
    {
        Task<bool> CreateContentAsync(int idPerson, CreateUpdateContentDto createUpdateContentDto);
    }
}