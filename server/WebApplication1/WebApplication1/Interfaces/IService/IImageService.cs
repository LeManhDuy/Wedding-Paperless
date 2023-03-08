namespace WebApplication1.Interfaces.IService
{
    public interface IImageService
    {
        Task<string> ConvertBase64ToUrlAsync(string base64);

        Task<List<string>> ConvertListBase64ToUrlsAsync(List<string> base64s);
    }
}