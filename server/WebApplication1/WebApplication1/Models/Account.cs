using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
  public class Account
  {
    [Key]
    public int Id { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public byte[] PasswordHash { get; set; }

    [Required]
    public byte[] PasswordSalt { get; set; }

    [Required]
    public string Role { get; set; }

    public Person Person { get; set; }
  }
}
