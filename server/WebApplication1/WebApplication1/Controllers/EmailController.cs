using Firebase.Storage;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Services;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IEmailRepository _emailRepository;

        public EmailController(IEmailRepository emailRepository, DataContext context)
        {
            _emailRepository = emailRepository;
            _context = context;
        }

        /// <summary>
        /// Verify Email.
        /// </summary>
        [HttpGet("confirm/{email}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ConfirmEmail([FromRoute] string email)
        {
            await _emailRepository.ConfirmEmail(email);
            return Ok();
        }

        /// <summary>
        /// Test Convert HTML.
        /// </summary>
        [HttpPut("convert")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ConvertHtml([FromBody] string htmlPageString)
        {
            try
            {
                byte[] bytes = Convert.FromBase64String(htmlPageString);

                // Convert byte array to normal string
                string normalString = Encoding.UTF8.GetString(bytes);

                HtmlDocument htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(normalString);
                HtmlNode htmlPage = htmlDoc.DocumentNode;

                var images = htmlPage.SelectNodes("//img");
                if (images != null)
                {
                    foreach (var img in images)
                    {
                        var base64String = img.Attributes["src"].Value.Split("base64,")[1];
                        byte[] bytesImage = Convert.FromBase64String(base64String);
                        var storage = new FirebaseStorage("marinerum.appspot.com");
                        var stream = new MemoryStream(bytesImage);

                        long ticks = DateTime.Now.Ticks;
                        byte[] bytesTime = BitConverter.GetBytes(ticks);
                        string id = Convert.ToBase64String(bytesTime)
                                                .Replace('+', '_')
                                                .Replace('/', '-')
                                                .TrimEnd('=');

                        var downloadUrl = await storage.Child("images_by_months/" + DateTime.Now.Month + "/img" + "_" + id).PutAsync(stream);
                        img.SetAttributeValue("src", downloadUrl);
                    }
                }

                return Ok(htmlPage.InnerHtml);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
