using AutoMapper;
using Firebase.Storage;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class AlbumnRepository : IAlbumnRepository
    {
        public readonly DataContext _context;
        public readonly IMapper _mapper;
        public AlbumnRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> AlbumnExist(int albumnId)
        {
            return await _context.Albumns.AnyAsync(a => a.Id == albumnId);
        }

        public async Task<Albumn> CreateAlbumn(int contentId, int[] matrix, string imageLink)
        {
            try
            {
                var content = await _context.Contents.FirstOrDefaultAsync(a => a.Id == contentId);
                if (content == null)
                {
                    throw new Exception("Content not found !!!");
                }

                var base64String = imageLink.Split("base64,")[1];
                byte[] bytesImage = Convert.FromBase64String(base64String);
                var storage = new FirebaseStorage("marinerum.appspot.com");
                var stream = new MemoryStream(bytesImage);

                long ticks = DateTime.Now.Ticks;
                byte[] bytesTime = BitConverter.GetBytes(ticks);
                string id = Convert.ToBase64String(bytesTime)
                                        .Replace('+', '_')
                                        .Replace('/', '-')
                                        .TrimEnd('=');

                imageLink = await storage.Child("images_by_months/" + DateTime.Now.Month + "/img" + "_" + id).PutAsync(stream);

                var albumn = new Albumn()
                {
                    ImageLink = imageLink,
                    Content = content,
                    Row = matrix[0],
                    Column = matrix[1]
                };
                await _context.Albumns.AddAsync(albumn);
                await _context.SaveChangesAsync();
                return albumn;
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }



        public async Task<bool> DeleteAlbumn(AlbumnDto albumn)
        {
            _context.Remove(_mapper.Map<Albumn>(albumn));
            return await Save();
        }

        public async Task<AlbumnDto> GetAlbumnById(int id)
        {
            return await _context.Albumns.Where(a => a.Id == id)
                .Include(a => a.Content)
                .ThenInclude(c => c.Person)
                .Select(a => new AlbumnDto
                {
                    Id = a.Id,
                    ImageLink = a.ImageLink,
                    PersonName = a.Content.Person.FullName
                }).FirstOrDefaultAsync();
        }

        public async Task<List<AlbumnDto>> GetAlbumns()
        {
            return await _context.Albumns.OrderBy(a => a.Id)
                .Include(a => a.Content)
                .ThenInclude(c => c.Person)
                .Select(a => new AlbumnDto
                {
                    Id = a.Id,
                    ImageLink = a.ImageLink,
                    PersonName = a.Content.Person.FullName
                }).ToListAsync();
        }

        public async Task<bool> Save()
        {
            var Saved = await _context.SaveChangesAsync();
            return Saved > 0 ? true : false;
        }

        public async Task<bool> UpdateAlbumn(int contentId, int[] matrix, string imageLink)
        {
            try
            {
                var content = await _context.Contents.FirstOrDefaultAsync(a => a.Id == contentId);
                if (content == null)
                {
                    throw new Exception("Content not found !!!");
                }



                var base64String = imageLink.Split("base64,")[1];
                byte[] bytesImage = Convert.FromBase64String(base64String);
                var storage = new FirebaseStorage("marinerum.appspot.com");
                var stream = new MemoryStream(bytesImage);

                long ticks = DateTime.Now.Ticks;
                byte[] bytesTime = BitConverter.GetBytes(ticks);
                string id = Convert.ToBase64String(bytesTime)
                                        .Replace('+', '_')
                                        .Replace('/', '-')
                                        .TrimEnd('=');

                imageLink = await storage.Child("images_by_months/" + DateTime.Now.Month + "/img" + "_" + id).PutAsync(stream);

                var albumn = new Albumn()
                {
                    ImageLink = imageLink,
                    Content = content,
                    Row = matrix[0],
                    Column = matrix[1]
                };
                _context.Albumns.Update(albumn);
                await _context.SaveChangesAsync();
                return await Save();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
