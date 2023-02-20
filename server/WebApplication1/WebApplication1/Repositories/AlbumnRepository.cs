using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class AlbumnRepository : IAlbumnRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AlbumnRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public Task<bool> CreateAlbumn(int contentId, AlbumnDto albumn)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteAlbumn(AlbumnDto albumn)
        {
            _context.Albumns.Remove(_mapper.Map<Albumn>(albumn));
            return await Save();
        }

        public async Task<AlbumnDto> GetImage(int id)
        {
            return await _context.Albumns.Where(a => a.Id == id).Select(a => new AlbumnDto
            {
                Id = a.Id,
                ImageLink = a.ImageLink,
            }).FirstOrDefaultAsync();
        }

        public async Task<List<AlbumnDto>> GetImages()
        {
            return await _context.Albumns.OrderBy(a => a.Id).Select(a => new AlbumnDto
            {
                Id = a.Id,
                ImageLink = a.ImageLink,
            }).ToListAsync();
        }

        public async Task<bool> ImageExist(int id)
        {
            return await _context.Albumns.AnyAsync(a => a.Id == id);
        }

        public async Task<bool> Save()
        {
            var Saved = await _context.SaveChangesAsync();
            return Saved > 0 ? true : false;
        }

        public Task<bool> UpdateAlbumn(int contentId, AlbumnDto albumn)
        {
            throw new NotImplementedException();
        }
    }
}
