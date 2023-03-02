using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Dto;

namespace WebApplication1.Interfaces.IService
{
    public interface IAlbumService
    {
        Task<bool> CreateListAlbumnAsync(int contentId, List<CreateAlbumDto> createAlbumDtos);
    }
}