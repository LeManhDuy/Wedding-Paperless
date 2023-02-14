using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
    public class AccountDto
    {
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string PassWord { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
