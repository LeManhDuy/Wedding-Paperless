using AutoMapper;
using Firebase.Storage;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PersonRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Person> GetPersonByEmailAsync(string email)
        {
            return await _context.Persons.Where(p => p.Email == email).Include(c => c.Account).FirstOrDefaultAsync();
        }

        public async Task<PersonDto> GetPersonByIdAsync(int id)
        {
            var person = await _context.Persons.FirstOrDefaultAsync(p => p.Id == id);
            if (person == null)
            {
                throw new Exception("Person not found");
            }
            var personDto = _mapper.Map<PersonDto>(person);
            Console.WriteLine(personDto.Id);
            return personDto; 
        }

        public async Task<Person> GetPersonToSolveByIdAsync(int id)
        {
            return await _context.Persons.FirstOrDefaultAsync(p => p.Id == id);
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
            try
            {
                if (person.Avatar.Contains("base64,"))
                {
                    var base64String = person.Avatar.Split("base64,")[1];
                    byte[] bytesImage = Convert.FromBase64String(base64String);
                    var storage = new FirebaseStorage("marinerum.appspot.com");
                    var stream = new MemoryStream(bytesImage);
            
                    long ticks = DateTime.Now.Ticks;
                    byte[] bytesTime = BitConverter.GetBytes(ticks);
                    string id = Convert.ToBase64String(bytesTime)
                        .Replace('+', '_')
                        .Replace('/', '-')
                        .TrimEnd('=');
            
                    person.Avatar = await storage.Child("avatar/" + DateTime.Now.Month + "/img" + "_" + id).PutAsync(stream);
                }
                
                _context.Persons.Update(person);
                return await SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("Error saving");
            }
        }

        public async Task DeletePersonAsync(int id)
        {
            try
            {
                var person = await _context.Persons.FirstOrDefaultAsync(p => p.Id == id);
                if (person == null)
                {
                    throw new Exception("Person not found");
                }
                
                _context.Remove(person);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task StorePersonAsync(int id)
        {
            try
            {
                var person = await _context.Persons.FirstOrDefaultAsync(p => p.Id == id);
                if (person == null)
                {
                    throw new Exception("Person not found");
                }
                person.IsHidden = !person.IsHidden;
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

    }
}