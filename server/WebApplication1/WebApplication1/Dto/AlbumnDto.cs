using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Dto
{
    public class AlbumnDto
    {
        public int Id { get; set; }

        [Required]
        public string ImageLink { get; set; }

        [Required]
        public int Row { get; set; }
        public string PersonName { get; set; }
        public int ContentId { get; set; }
    }
}
