using Firebase.Storage;
using WebApplication1.Interfaces.IService;

namespace WebApplication1.Services
{
    public class ImageService : IImageService
    {
        public async Task<string> ConvertBase64ToUrlAsync(string url)
        {
                var base64String = url.Split("base64,")[1];
                byte[] bytesImage = Convert.FromBase64String(base64String);
                var storage = new FirebaseStorage("marinerum.appspot.com");
                var stream = new MemoryStream(bytesImage);

                long ticks = DateTime.Now.Ticks;
                byte[] bytesTime = BitConverter.GetBytes(ticks);
                string id = Convert.ToBase64String(bytesTime)
                                        .Replace('+', '_')
                                        .Replace('/', '-')
                                        .TrimEnd('=');
                                        
                return await storage.Child("images_by_months/" + DateTime.Now.Month + "/img" + "_" + id).PutAsync(stream);
        }

        public async Task<List<string>> ConvertListBase64ToUrlsAsync(List<string> urls)
        {

            List<string> urlResults = new List<string>();

            foreach (var item in urls)
            {
                urlResults.Add(await ConvertBase64ToUrlAsync(item));
            }

            return urlResults;
        }
    }
}