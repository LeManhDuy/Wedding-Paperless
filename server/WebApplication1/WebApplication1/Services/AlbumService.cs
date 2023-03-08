using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Interfaces.IService;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class AlbumService : IAlbumService
    {
        public readonly IAlbumnRepository _albumnRepository;
        public readonly IImageService _imageService;
        public readonly IContentRepository _contentRepository;
        public AlbumService(IImageService imageService, IContentRepository contentRepository,IAlbumnRepository albumnRepository)
        {
            _imageService = imageService;
            _contentRepository = contentRepository;
            _albumnRepository = albumnRepository;
        }
        public async Task<bool> CreateListAlbumnAsync(int contentId, List<CreateAlbumDto> createAlbumDtos)
        {
            if(!await _contentRepository.ContentExistAsync(contentId)){
                return false;
            }
            var content = await _contentRepository.GetContentByIdAsync(contentId);

           foreach (var item in createAlbumDtos)
           {
                if(string.IsNullOrWhiteSpace(item.ImageLink)){
                    continue;
                }

                var album = new Albumn(){
                    ImageLink = item.ImageLink,
                    Row = item.Row,
                    Content = content,
                };

                await _albumnRepository.CreateAlbumnWithoutColumnAsync(album);    
           }

           return true;
        }
    }
}