using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dto
{
    public class CreateAlbumDto
    {
        [Required]
        public string ImageLink { get; set; }

        [Required]
        public int Position { get; set; }
        public string PersonName { get; set; }
    }
}