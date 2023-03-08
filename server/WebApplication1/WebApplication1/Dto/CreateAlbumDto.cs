using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dto
{
    public class CreateAlbumDto
    {
        public string ImageLink { get; set; }

        [Required]
        public int Row { get; set; }
        public string PersonName { get; set; }
    }
}