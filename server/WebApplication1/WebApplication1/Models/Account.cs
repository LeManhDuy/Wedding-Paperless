using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Account : IdentityUser
    {
        [Key]
        public new int Id { get; set; }

        [Required]
        public new string UserName { get; set; }

        [Required]
        public new byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required]
        public string Role { get; set; }

        public Person Person { get; set; }
    }
}
