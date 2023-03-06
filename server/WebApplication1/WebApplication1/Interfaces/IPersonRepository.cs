using WebApplication1.Dto;
using WebApplication1.Models;

namespace WebApplication1.Interfaces
{
    public interface IPersonRepository
    {
        Task<Person> GetPersonByEmailAsync(string email);

        Task<bool> UpdatePersonAsync(Person person);

        Task<PersonDto> GetPersonByIdAsync(int id);

        Task<bool> PersonIsExistsAsync(int id);
        Task<Person> GetPersonToSolveByIdAsync(int id);

        Task<bool> SaveChanges();
        
        Task DeletePersonAsync(int id);
        Task StorePersonAsync(int id);
    }
}