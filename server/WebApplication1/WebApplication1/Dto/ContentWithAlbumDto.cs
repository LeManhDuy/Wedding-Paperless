using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dto
{
    public class ContentWithAlbumDto
    {
    public int Id { get; set; }

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

    public List<AlbumnDto> AlbumnDtos {get; set;} 
    }
}