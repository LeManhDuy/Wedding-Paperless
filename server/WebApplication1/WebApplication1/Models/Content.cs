using System.ComponentModel.DataAnnotations;
namespace WebApplication1.Models
{
    public class Content
    {
        [Key]
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

        [Required]
        public int PersonId { get; set; }

        public Person Person { get; set; }

        public List<Albumn> Albumns { get; set; }

        public List<RegisterSong> RegisterSongs { get; set; }
    }
}
