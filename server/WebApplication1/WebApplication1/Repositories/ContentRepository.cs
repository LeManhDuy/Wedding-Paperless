using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Dto;
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

        public async Task<bool> ContentIsExistByPersonId(int personId)
        {
            return await _context.Contents.AnyAsync(p => p.PersonId == personId);
        }

        public async Task<List<AlbumnDto>> GetAlbumnContentAsync(int id)
        {
            return await _context.Albumns
                .Where(a => a.Content.Id == id)
                .OrderBy(a => a.Id)
                .Include(a => a.Content)
                .ThenInclude(c => c.Person)
                .Select(a => new AlbumnDto
                {
                    Id = a.Id,
                    ImageLink = a.ImageLink,
                    PersonName = a.Content.Person.FullName,
                    ContentId = a.Content.Id,
                    Row = a.Row
                }).ToListAsync();
        }

        public async Task<List<RegisterSongDto>> GetSongContentAsync(int id)
        {
            return await _context.RegisterSongs
                .Where(s => s.Content.Id == id)
                .OrderBy(s => s.Id)
                .Include(s => s.Content)
                .ThenInclude(c => c.Person)
                .Select(s => new RegisterSongDto
                {
                    Id = s.Id,
                    FullName = s.FullName,
                    SongName = s.SongName,
                    LinkBeat = s.LinkBeat,
                }).ToListAsync();
        }

        public async Task<DateTimeDto> CountContentsByDateTime()
        {
            var contents = await _context.Contents.ToListAsync();

            var contentCountsByYear = contents
                .GroupBy(c => c.Date.Year)
                .Select(g => new { Year = g.Key.ToString(), Count = g.Count() })
                .OrderBy(x => x.Year)
                .ToDictionary(x => x.Year, x => x.Count);

            var contentCountsByMonth = contents
                .GroupBy(c => new { c.Date.Year, c.Date.Month })
                .Select(g => new { Year = g.Key.Year.ToString(), Month = g.Key.Month.ToString(), Count = g.Count() })
                .OrderBy(x => x.Year)
                .ThenBy(x => x.Month)
                .ToDictionary(x => x.Year + "-" + x.Month, x => x.Count);

            var contentCountsByDay = contents
                .GroupBy(c => c.Date.Date)
                .Select(g => new { Day = g.Key.ToString("yyyy-MM-dd"), Count = g.Count() })
                .OrderBy(x => x.Day)
                .ToDictionary(x => x.Day, x => x.Count);

            return new DateTimeDto
            {
                NumbByDays = contentCountsByDay,
                NumbByMonths = contentCountsByMonth,
                NumbByYears = contentCountsByYear
            };
        }


        // public async Task<DateTimeDto> CountContentsByDateTime()
        // {
        //     var contents = await _context.Contents.ToListAsync();
        //     
        //     var contentCountsByYear = contents
        //         .GroupBy(c => c.Date.Year)
        //         .Select(g => new { Year = g.Key, Count = g.Count() })
        //         .OrderBy(x => x.Year)
        //         .ToList();
        //     
        //     var contentCountsByMonth = contents
        //         .GroupBy(c => new { c.Date.Year, c.Date.Month })
        //         .Select(g => new { Year = g.Key.Year, Month = g.Key.Month, Count = g.Count() })
        //         .OrderBy(x => x.Year)
        //         .ThenBy(x => x.Month)
        //         .ToList();
        //     
        //     var contentCountsByDay = contents
        //         .GroupBy(c => new { c.Date.Year, c.Date.Month, c.Date.Day })
        //         .Select(g => new { Year = g.Key.Year, Month = g.Key.Month, Day = g.Key.Day, Count = g.Count() })
        //         .OrderBy(x => x.Year)
        //         .ThenBy(x => x.Month)
        //         .ThenBy(x => x.Day)
        //         .ToList();
        //     
        //     var dto = new DateTimeDto();
        //     
        //     dto.NumbByYears = contentCountsByYear.Select(x => x.Count).ToArray();
        //     dto.NumbByMonths = contentCountsByMonth.Select(x => x.Count).ToArray();
        //     dto.NumbByDays = contentCountsByDay.Select(x => x.Count).ToArray();
        //     
        //     return dto;
        // }


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

        public async Task<Content> GetContentByIdPersonAsync(int personId)
        {
            return await _context.Contents.Where(p => p.PersonId == personId).FirstOrDefaultAsync();
        }

        public async Task<Content> GetContentByIdPersonWithAlbumsAsync(int personId)
        {
            return await _context.Contents.Where(p => p.PersonId == personId)
                .Include(x => x.Albumns)
                .FirstOrDefaultAsync();
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