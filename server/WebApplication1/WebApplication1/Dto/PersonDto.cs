using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
  public class PersonDto
  {
    public int Id { get; set; }

    [Required]
    public string FullName { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }
    
    public string Avatar { get; set; }
  }

  public class UpdatePersonDto
  {
    public string FullName { get; set; }
    public string Avatar { get; set; }
  }
}
