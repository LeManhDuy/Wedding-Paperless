using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Person
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }
        public string Avatar { get; set; } = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required]
        public bool EmailConfirmed { get; set; }

        [Required]
        public string EmailVerifiedAt { get; set; }

        [Required]
        public int AccountId { get; set; }
        public Account Account { get; set; }

        public Content Content { get; set; }
        public bool IsHidden { get; set; } = true;
    }
}
