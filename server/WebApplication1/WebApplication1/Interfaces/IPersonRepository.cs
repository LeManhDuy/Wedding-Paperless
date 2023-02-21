using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IPersonRepository
    {
        Task<Person> GetPersonByEmailAsync(string email);

        Task<bool> UpdatePersonAsync(Person person);

        Task<bool> SaveChanges();
    }
}