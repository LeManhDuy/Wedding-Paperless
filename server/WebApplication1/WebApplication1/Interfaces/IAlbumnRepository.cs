using WebApplication1.Dto;
using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IAlbumnRepository
    {
        Task<List<AlbumnDto>> GetAlbumns();
        Task<AlbumnDto> GetAlbumnById(int id);
        Task<Albumn> CreateAlbumn(int contentId, int[] matrix, string imageLink);
        Task<bool> UpdateAlbumn(int contentId, int[] matrix, string imageLink);
        Task<bool> DeleteAlbumn(AlbumnDto albumn);
        Task<bool> AlbumnExist(int albumnId);
        Task<bool> Save();
    }
}
