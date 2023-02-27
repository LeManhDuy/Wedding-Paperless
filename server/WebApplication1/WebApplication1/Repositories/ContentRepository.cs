using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class ContentRepository : IContentRepository
    {
        private readonly DataContext _context;

        public ContentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> ContentExistAsync(int contentId)
        {
            return await _context.Contents.AnyAsync(p => p.Id == contentId);
        }

        public async Task<bool> CreateContentAsync(Content content)
        {
            await _context.Contents.AddAsync(content);
            return await SaveAsync();
        }

        public async Task<bool> DeleteContentAsync(int id)
        {
            var content = await _context.Contents.Where(p => p.Id == id).FirstOrDefaultAsync();
            _context.Contents.Remove(content);
            return await SaveAsync();
        }

        public async Task<Content> GetContentByIdAsync(int id)
        {
            return await _context.Contents.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Content>> GetContentsAsync()
        {
            return await _context.Contents.ToListAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateContentAsync(Content content)
        {
            _context.Contents.Update(content);
            return await SaveAsync();
        }
    }
}