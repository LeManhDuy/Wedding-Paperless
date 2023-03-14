using WebApplication1.Dto;
using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IRegisterSongRepository
    {
        Task<List<RegisterSong>> GetSongsAsync();
        bool RegisterSongExists(int registerSongId);
        Task<RegisterSong> GetSongAsync(int registerSongId);
        Task<RegisterSongDto> CreateAsync(int contentId, RegisterSongDto registerSongDto);

        Task<RegisterSongDto> CreateByPersonIdAsync(int personId, RegisterSongDto registerSongDto);
        Task<RegisterSongDto> UpdateAsync(int registerSongId, RegisterSongDto registerSongDto);
        Task<bool> SaveAsync();
        Task DeleteAsync(int registerSongId);
    }
}
