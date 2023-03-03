using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dto;
using WebApplication1.Interfaces;
using WebApplication1.Interfaces.IService;

namespace WebApplication1.Controllers;

[Route("api/person")]
[ApiController]
public class PersonController: ControllerBase
{
    private readonly IEmailRepository _emailRepository;        
    private readonly IAccountService _accountService;
    private readonly IPersonRepository _personRepository;
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;
    private readonly IAuthRepository _authRepository;

    public PersonController(IPersonRepository personRepository, IEmailRepository emailRepository, IAccountService accountService, IAccountRepository accountRepository, IMapper mapper, IAuthRepository authRepository)
    {
        _personRepository = personRepository;
        _emailRepository = emailRepository;
        _accountService = accountService;
        _accountRepository = accountRepository;
        _mapper = mapper;
        _authRepository = authRepository;
    }
    
    // /// <summary>
    // /// Get all account.
    // /// </summary>
    // /// <returns>A list account</returns>
    // [HttpGet]
    // [Authorize(Roles = "admin")]
    // [ProducesResponseType(200)]
    // [ProducesResponseType(400)]
    // public async Task<ActionResult<ICollection<PersonDto>>> GetPersons()
    // {
    //     try
    //     {
    //         if (!_authRepository.IsTokenValid())
    //         {
    //             return Unauthorized();
    //         }
    //         var persons = await _personRepository.GetAllPersons();
    //
    //         if (!ModelState.IsValid)
    //             return BadRequest(ModelState);
    //         
    //         var personDtos = _mapper.Map<ICollection<PersonDto>>(persons);
    //
    //         return Ok(personDtos);
    //     }
    //     catch (Exception e)
    //     {
    //         Console.WriteLine(e);
    //         return StatusCode(StatusCodes.Status500InternalServerError);
    //     }
    // }

    [HttpGet("{id}")]
    [Authorize(Roles = "admin, user")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<PersonDto>> GetPerson(int id)
    {
        if (!_authRepository.IsTokenValid())
        {
            return RedirectToAction("SignIn", "Account");
        }
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var person = await _personRepository.GetPersonByIdAsync(id);
            return Ok(person);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpPatch("{id}")]
    [Authorize(Roles = "admin, user")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> PatchPerson(int id, [FromBody] JsonPatchDocument<UpdatePersonDto> patchDoc)
    {
        if (!_authRepository.IsTokenValid())
        {
            return Unauthorized();
        }
        if (patchDoc != null)
        {
            var person = await _personRepository.GetPersonToSolveByIdAsync(id);
            var updatePersonDto = _mapper.Map<UpdatePersonDto>(person);

            patchDoc.ApplyTo(updatePersonDto, ModelState);

            person.FullName = updatePersonDto.Fullname;
            person.Avatar = updatePersonDto.Avatar;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(!await _personRepository.UpdatePersonAsync(person)){
                ModelState.AddModelError("", "Something went wrong updating person");                    
            } 
                   
            return Ok();
        }

        return BadRequest(ModelState);
    } 
}