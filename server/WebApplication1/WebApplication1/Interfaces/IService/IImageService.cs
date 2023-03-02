namespace WebApplication1.Interfaces.IService
{
    public interface IImageService
    {
        Task<string> ConvertBase64ToUrlAsync(string url);

        Task<List<string>> ConvertListBase64ToUrlsAsync(List<string> urls);
    }
}