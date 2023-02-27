using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly DataContext _context;
        public PersonRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Person> GetPersonByEmailAsync(string email)
        {
            return await _context.Persons.Where(p => p.Email == email).Include(c => c.Account).FirstOrDefaultAsync();
        }

        public async Task<Person> GetPersonByIdAsync(int id)
        {
            return await _context.Persons.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<bool> PersonIsExistsAsync(int id)
        {
            return await _context.Persons.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> SaveChanges()
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdatePersonAsync(Person person)
        {
            _context.Persons.Update(person);
            return await SaveChanges();
        }

    }
}