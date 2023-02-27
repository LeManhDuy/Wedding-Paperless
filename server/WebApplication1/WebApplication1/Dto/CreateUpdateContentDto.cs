using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
    public class CreateUpdateContentDto
    {
    [Required]
    public string HostName { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string Address { get; set; }

    [Required]
    public string Story { get; set; }

    [Required]
    public string Wish { get; set; }

    public string PersonName { get; set; }
    }
}