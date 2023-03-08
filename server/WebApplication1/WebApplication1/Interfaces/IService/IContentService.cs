using WebApplication1.Dto;

namespace WebApplication1.Interfaces.IService
{
    public interface IContentService
    {
        Task<bool> CreateContentAsync(int personId, CreateUpdateContentDto createUpdateContentDto);

        Task<ContentWithAlbumDto> GetContentWithAlbumAsync(int contentId);

        Task<bool> ExistContentByPersonIdAsync(int personId);

    }
}