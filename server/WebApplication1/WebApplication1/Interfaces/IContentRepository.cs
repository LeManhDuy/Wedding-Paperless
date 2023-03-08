using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IContentRepository
    {
        Task<List<Content>> GetContentsAsync();
        Task<Content> GetContentByIdAsync(int id);
        Task<bool> CreateContentAsync(Content content);
        Task<bool> UpdateContentAsync(Content content);
        Task<bool> DeleteContentAsync(int id);
        Task<bool> ContentExistAsync(int contentId);
        Task<Content> GetContentByIdPersonWithAlbumsAsync(int personId);
        Task<Content> GetContentByIdPersonAsync(int personId);
        Task<bool> ContentIsExistByPersonId(int personId);
        Task<bool> SaveAsync();
    }
}