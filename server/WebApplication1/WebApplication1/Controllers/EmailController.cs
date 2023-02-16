using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Services;

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

        [HttpGet]
        public IActionResult TestEmail()
        {
            Message content = new Message
            {
                To = "lemanhduy311111@gmail.com",
                Subject = "Kiểm tra thử",
                Body = "<p><strong>Xin chào xuanthulab.net</strong></p>"
            };

            _emailRepository.SendEmail(content);
            return Ok();
        }

        [HttpGet("confirm/{token}&{email}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> ConfirmEmail([FromRoute] string email)
        {
            await _emailRepository.ConfirmEmail(email);
            return Ok();
        }

        //[HttpGet("ConfirmEmail")]
        //public async Task<IActionResult> ConfirmEmail(string token, string email)
        //{
        //    var user = await _emailRepository.FindByEmailAsync(email);

        //    if (user != null)
        //    {
        //        var result = await _emailRepository.ConfirmEmailAsync(user, token);
        //        if (result.Succeeded)
        //        {
        //            return Ok();
        //        }
        //    }

        //    return BadRequest();
        //}

    }
}
