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

        public string Role { get; set; }
    }
    
    public class TokenAccountDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
    }

    public class AccountInfoDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
