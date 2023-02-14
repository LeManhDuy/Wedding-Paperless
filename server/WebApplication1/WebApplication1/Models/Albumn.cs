using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
  public class Albumn
  {
    [Key]
    public int Id { get; set; }

    [Required]
    public string ImageLink { get; set; }

    [Required]
    public Content Content { get; set; }
  }
}