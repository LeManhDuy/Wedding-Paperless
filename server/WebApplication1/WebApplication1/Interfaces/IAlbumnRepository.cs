using WebApplication1.Dto;

namespace WebApplication1.Interfaces
{
    public interface IAlbumnRepository
    {
        Task<List<AlbumnDto>> GetImages();
        Task<AlbumnDto> GetImage(int id);
        Task<bool> ImageExist(int id);
        Task<bool> CreateAlbumn(int contentId, AlbumnDto albumn);
        Task<bool> UpdateAlbumn(int contentId, AlbumnDto albumn);
        Task<bool> DeleteAlbumn(AlbumnDto albumn);
        Task<bool> Save();
    }
}
