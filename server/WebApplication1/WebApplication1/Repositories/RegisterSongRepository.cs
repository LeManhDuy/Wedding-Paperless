using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class RegisterSongRepository : IRegisterSongRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public RegisterSongRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<RegisterSongDto> CreateAsync(int contentId, RegisterSongDto registerSongDto)
        {
            try
            {
                var content = await _context.Contents.Where(c => c.Id == contentId).FirstOrDefaultAsync();
                if (content == null)
                    throw new Exception("One or more contents not found!");

                var registerSong = new RegisterSong()
                {
                    FullName = registerSongDto.FullName,
                    SongName = registerSongDto.SongName,
                    LinkBeat = registerSongDto.LinkBeat,
                    Content = content
                };

                await _context.RegisterSongs.AddAsync(registerSong);
                await _context.SaveChangesAsync();

                return registerSongDto;
            }
            catch (Exception ex)
            {
                throw new Exception("Message: " + ex.Message);
            }
        }

        public async Task DeleteAsync(int registerSongId)
        {
            var registerSong = await _context.RegisterSongs.Where(c => c.Id == registerSongId).FirstOrDefaultAsync();
            if (registerSong == null)
                throw new Exception("One or more registerSong not found!");

            _context.RegisterSongs.Remove(registerSong);

            await _context.SaveChangesAsync();
        }

        public async Task<RegisterSong> GetSongAsync(int registerSongId)
        {
            var data = await _context.RegisterSongs.FirstOrDefaultAsync(p => p.Id == registerSongId);
            return data;
        }

        public async Task<List<RegisterSong>> GetSongsAsync()
        {
            var data = await _context.RegisterSongs.ToListAsync();
            return data;
        }

        public bool RegisterSongExists(int registerSongId)
        {
            return _context.RegisterSongs.Any(c => c.Id == registerSongId);
        }

        public async Task<RegisterSongDto> UpdateAsync(int registerSongId, RegisterSongDto registerSongDto)
        {
            var registerSong = await _context.RegisterSongs.Where(c => c.Id == registerSongId).FirstOrDefaultAsync();
            if (registerSong == null)
                throw new Exception("One or more registerSong not found!");

            registerSong.FullName = registerSongDto.FullName;
            registerSong.SongName = registerSongDto.FullName;
            registerSong.LinkBeat = registerSongDto.LinkBeat;

            _context.RegisterSongs.Update(registerSong);
            await _context.SaveChangesAsync();

            return registerSongDto;
        }
    }
}
