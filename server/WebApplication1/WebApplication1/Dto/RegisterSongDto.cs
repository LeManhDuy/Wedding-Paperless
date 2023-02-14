using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
  public class RegisterSongDto
  {
    public int Id { get; set; }

    [Required]
    public string FullName { get; set; }

    [Required]
    public string SongName { get; set; }

    [Required]
    public string LinkBeat { get; set; }
  }
}