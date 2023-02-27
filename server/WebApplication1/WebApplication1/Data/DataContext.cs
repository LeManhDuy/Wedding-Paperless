using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Albumn> Albumns { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<RegisterSong> RegisterSongs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
     base.OnModelCreating(modelBuilder); 
        }
    }
}
