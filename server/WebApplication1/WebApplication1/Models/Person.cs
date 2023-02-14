using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
  public class Person
  {
    [Key]
    public int Id { get; set; }

    [Required]
    public string FullName { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

    [Required]
    public bool EmailConfirmed { get; set; }

    [Required]
    public int AccountId { get; set; }
    public Account Account { get; set; }

    public Content Content { get; set; }
  }
}
