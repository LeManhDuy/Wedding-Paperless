﻿using Firebase.Storage;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Interfaces;
using WebApplication1.Services;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IEmailRepository _emailRepository;

        public EmailController(IEmailRepository emailRepository, DataContext context)
        {
            _emailRepository = emailRepository;
            _context = context;
        }

        [HttpGet]
        public IActionResult TestEmail()
        {
            Message content = new Message
            {
                To = "lemanhduy311111@gmail.com",
                Subject = "Kiểm tra thử",
                Body = "<p><strong>Xin chào xuanthulab.net</strong></p>"
            };

            _emailRepository.SendEmail(content);
            return Ok();
        }

        //[HttpGet("confirm/{token}&{email}")]
        //[ProducesResponseType(204)]
        //[ProducesResponseType(400)]
        //public async Task<ActionResult> ConfirmEmail([FromRoute] string email)
        //{
        //    //await _emailRepository.ConfirmEmail(email);
        //    return Ok(a);
        //}
        [HttpPut("confirm")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> ConfirmEmail([FromBody] string htmlPageString)
        {
            byte[] bytes = Convert.FromBase64String(htmlPageString);

            // Convert byte array to normal string
            string normalString = Encoding.UTF8.GetString(bytes);

            //var htmlPageString = "<p>abc</p><p><img src=\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUUExcTFRQYGBIZGB0cGBcYGBcdFxcXGBccGBkdHR0aICwjIB42Hh0cJTYlNi0zMzM0GSI4PjkwPSwyMy8BCwsLDw4PHhISHjMpIykyOjQ0MjI0MjI6MjIyMjIyMjI6MjI6MjIvMjIyMi8yMjIyMjIyMjIyMjoyMjoyMjIyM//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EAEMQAAICAQMDAgQDBAUKBgMAAAECAxEABBIhBRMxIkEGMlFhQnGBFCNikQczUoKhFTVyc3SSsbLh8ENTY7PB0RYXJP/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIxEBAQADAAICAgIDAAAAAAAAAAECESESMQNBUWEiMhOR8P/aAAwDAQACEQMRAD8A/LcYxnveYxjGAxjGAxjGAxjGAxjGAxnbS6WSVxHHG0jt4RFLMf0Ht981mk/o06jIu5kjjH0kkF/yjDZm5Se10xuM2v8A+vXQFpdTGFUW3aSRzQFmrC8/kDkaf4eQ0iukMe75pZIzNIx4BZUPHkhUA9+TZ4ecZtkZPGarrvw1Fp1CRu8s582UWNAPN++6/AvM7rdBLDXcjZA3ykj0tf0Yek/ocsspjlMvSOB/3+XJxlx8JQu+v0qoLYzJY/gDXJf22Br+159+K+mDT6qVErt7zsA9hsRyPyG8AfbJvulU2MYzQYxjAYxjAYxjAYxjAYxjAYxjAYxjAYxjAYxnvtcXYHBNGwSAdvFijzfgn5TdVkV4AyYOlynt0oIlkMcTAgq7qyoaYcVuYc+/OcdNalX2Ky2VHcH7skrRvkeNwPnjjNz8GayOSFdNMvqhmDRyUSm7fvWnHAYOW9/UH98zldTaW6m2+6V06LpsQ08CgyUDLKR6nbz/AC+g8AfeznjVSyPZHrf2DuFQE+5J8L+QJ+gOTYtOZjI5aiDZv2Bsn/AZV63URpJ2+6iseULEepT4IsgE/UDx755/bhncr2+kHqHS1K2wXUzkj1TCoEJ8lIzYVB9aLngFubFZpukSaaTu9uKY/wACJHJH/qxQT/5N8tnvraRlFd5JJS5IiRRHbH+FQu5v0BOV+g6zLARG6SBfASVHRvr6C6jmvbn8hm5LrjPllZv6WWp6qiNY0kju39qGXeD9CdjAj8mIznpOu2pSTSlYyW3KACDRpvQRtq/PPm/fPrMJ1r9skXcK7f7pGJPtuiQMf0yy6L0p4lKGRVBI2kBztAAUcuSaC8V7WfsBLqe059e3TpTwIjPpIIVkZSCyx7GIPlS+07R9QB7eMzmv+D31JLy6hY5NzUDHuViaF2r2q0qhRTHaoJ5JAla8DRz7WnfazAd5Y5BGGaq7ncBjYc0XElg+VFE5a9W0s0kQWOQLJ77QNrj22lhatdMCDwff3xvV3G7lljevyTqnTpNPI0Ugp19xyrL7Mp91P/Q0RWRM2fxN0/WGG5C8iR+olljYqvAJ7iruHtdnnMZnfG7jrMvKbMYxmmjGMYDGMYDGMYDGMYDGMYDGMYDGMYDJvcWJ43QrKyFXKulx7g24oyk+pb8/WznKOIMVoEgKWk2sAdqklq3Cg20fxex58Z5j2dz5WMe75QRv2X4uquveqyKsu0kh9CiTWSyOOykamFY5IywKEHh1LEAeE2c/Lzvfh3VSLARJaMncA06bRHBEjIgbaoLM+4tySS9HyRn5v07UpHOsnr2KW+U7XFqyimBHNkHyM1+liZ4zp4ye7IytPIylVjVXKRxjcoLNuLC69TE+Qt5zzjPyZc0u9D8XxszJ3e2XWN0kWmKSqCrqQfmW759wwPvxQdXWRpF/fxyb3AWOPuBHdmAW0kZkUliOVHuTnTpPR9IkO7VEdx13FOWdEH4mUAtfNliKG6vbLf4d0+h3A6dVd1JIkK23Hggkce4uh4H1zPJ6cbf9I/UupjR7oNOxMyqqz6qgXJbhVS+ETn0rwov8TbiK1tVNMO0ZWkJ3bDYs0LZWobWHAIJXcpBIJ8Ze6v16poUPbQqxkZbUl9gLNuUg7toC3fFZX67o5hkW2Yadx2zIKLLvrcGoALu+WwDxxfNFNJ5bXnQ4EMSuiqspi3bitk8gX599ymrHDcfaB1HRayRiFNL/AASHb/J28/bxlwNQsHdQqRGkJkUgXaQhQ6D+ICmr3A+xqLqurrE43G4pUV4nB9JIoOoP1KUyj8RJHBIvMt3xm4+rFP8A5H1UQJ/ayr7SyxshdXUfNwFG4C+a3VYvznXoGvZ4pkVQCke9FUgxkkNxGfIQkKdv4SxA425q9Ns1Ebxo43sgeFwbCyAExuK8iwQfqNwPDZmeiSRzSd6Je3ICrSx+Npl3LKtfTcokH+sYeAMb3Ltqz+G3DR9V7mh1ivw/anbafO2RHdRX8LNX6DPzPP0j4z6YY0OohFUCsqgcGNwwYkD255+gJ9rz83zr8evcdfjvDGMZ0bMYxgMYxgMYxgMYxgMYxgMYxgMndO0UsrxpFHvd5GVPl9ThASvrO2gpv2+bz9IOGFH2vjkH7WOR78/obyLEhYu5MEYxx7pNpLWI49z0b8kIv60Bnt1O8xiSIdoSKsiWBJtZjwyrbFrIUn2KgkAZwJ45UcqApAqqrn01ZoVz9TfOetMNzKu6NeSd0lBeBfqNGx6QADY5r3OFdk0z95YViubcIzG1PuksrVCgBdcWRxd5+vaX4c7MW2aTdO6x71jOyOLtklFQLyCCfPA4FADg/n3wTHCJH1Ms3b7YO2OMASuW87ONqCiRYF0Wrbwc1XRusmWV23S9sLYEro7NuKiMLsUXx5P3AJ545Z7rl8mU1qO+u6CZB/WPIzFdxkKgOENqjrGgDILJoUbN+cnR6uNFIRUCICZHUgRR7fNvXqI+g/WsgazXdwEbgsX0vlx/F6lA9/QXX77gSo69O0ncANho+BTuX4oHb249sSHn+Ksx9dcL+2e02tbV6krChWMjZuIIqItukavdmP8Ax885M6z1fe7xj+pMUakHyJiwkXke4S7H/wBZYdI1UcZ1Dn5lMBkaud2o3FVr2VVCD9T9BlZ8Q6AQiJIloKxYlhal2PzE+WO3cKHjfz5vNctXkqy15R5H0skh2sWVCCN8btGrDn6FZWQg8bdo/EcrpekSJEUI7+mJO9E+dDzueMH3u90f1uqPJr+ldK1GplLHckRYh5zsZmbcdzUTzySaUccDigMttX03V6Yl4pe+vu0asknA8mNyQ/H0N/bHJza2WRXdNlk0oj1cXqgR2ViooMu75ivtyA36+54Nv8OGM6nUPGwIemUWL7bOXXj6DeUv+H8rseh6+F4C5oIC3esKCrH+sLigAfxcgff3yuPSdNFNHIAYpGao5I7eGRnFHZ5VbBPB2nzxxeS3e5TtlX/7UVlWPj1oxFixalQQQeCCG8fw/fjA/E3RIpEkmgjEWoh51GmHyFPeWH+D3I8UbpSCDstSxXV6Q/UyLdcWUBHH5gZn/iqGRdPHq4zbCJFdhzauoQk/VSrEH9P0mHKvx5a1+35zjGM9DuYxjKGMYwGMYwGMYwGMYwGMYwPq1Yu9ti6q696v3ycmg7pYRFT2oWklZmChth9eyz6vmUAUCa8XZPHp2qEUgkMccgphslUtH6lK2QCORdj7jOU2nKBbKsCARRBI9ufoeMjT0+pZkVD8q3t4H4vP5+2eeQFYpacgWCFauSLWixG4e9i1Hihl50X4cl1qPIhVQtAySF/VJzSJtB427SSRxxzyBls/9HswAaOeIuVplcMoBIIIVypDeTyQuZ8sYzbJfbOdH1vYJdk3xyBkIK88AEOhI27gSPBvn2sHLabqMsCK/bISZTsLjh0ryPKtW4gGweT9STU9U6VNpiseoSWPlqv1RngcxkNtYmuaP0xoYgESQzJt7u2SDazsse25JWSqKbbF3fHkezl6XCWpkTDWaxEeXfGzWZHBQlFTey0SQh9JUV9fLcZpvhbqanUSRxMWgPqqqC+brcb28cc3VfQDKfpGk00MkySyRzpKjRrFp98rkF1kR1IFhhSVfPzXRFG4jaPTI25HSZkVI4YoyzInu0hHoV34LAEkACrN5nK745/JJeJE3SGdpTDNGRI9fMGDKSj7SAeCroPH4QPPKm11GheVDGBH+0BArTG9kat+I2L3lQ1IASfsDYoOpFYNKrKpDSNUm+2IcIZF3g1QqzdWLU3lvoNKXUabcRFEN+pKEgvLITUYYUQPSQSOdsYHBo5iuc72rHSwR6bezz3DHGiR9w7B3GtSwCsF5CfLXA21yW3SYZle9jBgGKkg2Aw8i/1zNfFccatFsX96w2Ig4RUU8kKPHmqA54H0yxbUfskCKsJtjtSMN/4jHcqkgcCt3PttA5JGZ1zaZXyStR0/u1LCdmqr92/jeRyI5B+JCfTyLUmx4N5UaIS1PGscYHMrbNk0Qss24p6WShW5kYrR3eC2aHpPVRvEJ/rtpkIHKozu79sn2YArx558DKrryto9c08V9uUmUJ5V9xHeSj+Lfz9P3ifmNY73prH1/wB6XHXNFJLGpiY91GEiFfO5eQV+puiB71XvmPg6tLHG0LuO2FVTvTem2inqXzsIoNRBUgEe96D4Z1rGNoUppENxoSbYAeqNSfDe4J+o9uRUfFDQVHqIv6rUh1kUijHMtbty+24MpP3Un3OXGfVTDGsRq02uR6avjY+5a9qaySPzN5xz4M+52egxjGUMYxgMYxgMYxgMYxgMYxgM2Hwl8JrqB35d66e6jS6aUgDcdwAqPyLHJ5AIonM/0PQLNLtckRIjSSkee3GLYD+JuEH3cZL6jr559QzSyFSt7FUkIi16VjHgLVD8hzmMt3kLdR+m6TUacRBw0aoGdYolpUjjjcoX2jlmZ7IPPDD8RJOd6r8ZiOVVQApXqser25PPA8/yzPT6hZ41h3io72FfLF5Hfe3i63lKugASPOVh6SVLFj6QCbHigLsn2/KiftmZhPtx1jb1+wQSxzxAlVlgkAJRxaMPuPYj6+QRmL698FBHEmjTuxhtx00hO/2tVdSGdePlsN9LJOdem9ZJ0/b0iMUjH7yVgpZbskhEYlVu6dqAr3Piz03xLZHcSlo2V+vkUD9fHn6ffMSZT0zM8sOKP4T6tNM8OhZdgiV1eQMUZYlFnehUqzr4FgXe08ncNb11Y9DGY0ffM3gelWbxu+QALQJNgUCV8k818qCRn1hkDp6F2LGFbYrqdkjklmUnbY4sAD5eDQapZZZFaVwplKHuWSW7tFEUDnfzyAOACeAQRdS1vLKZeo46rVPNI7tRQmyPYuqlK/KjX905o9N1CLSRvEZAxKRyq7fI7PCgVN/jdalgLunNXRyRp+gxxtGvDCmXn3IjZ249gEQgfdr9spNdpW06SwFTtleNg/lWSIyM9/Q+pBX3b88u5lyOcs11bdAXus+tlIO60jP4UjQ0xHty18/b759bUjU6pFQ3BAe47+zSUQqj8hd/mfpma18CN22USRwBUQyIsg3yld0smzize4DgeBZAo56aaRIRAv7qAmidv72S6Kh2JKhiCLoe/B55aLjr7WnwsN2odh4/eEfrLV/45f6/Sx6kPA5KutPG4FtGxFBwPxLe5WX3FeDREXofTVggSctfchVvFBAB61HPNEefsMddDxtHqI/K+l/cFSeLr2u/5jMXuXGe41ltdpZtLKNw2Tr6kZTaSqpu0b8Qv28qTRAvml+JNUJGLoCI5ZZJVU+xZyfH5MM/VJY0niEcgDowDABuVavnRqtWF+a+xBHGflXxbD2tS0PcEgjApgKJ3ANTDwGoi6sfT6Dphluu3x2W8UmMYzq6mMYwGMYwGMYwGMYwGMYwGMYwO2m1LRklTVqVP3U/9QD+YGXepgT/ACbDMQBIZZEd/UXZE2UDuaqtwKAHy39cz2djqn7faJuMOXA+jFQrV+YA/wB0ZmwTZ9O0L9sDbLQYl9oKBltT7gDa1+T5v6Z81upZgyF7AFsardRAUfbnn73nvWdUlmaCVkJaIJGGpqdozaWa4coFBHk7b984ayTuSST7AqGQsEawG9YtLWrYAjdyDRJxDx65Q6l42E6TFJlcBdpZZK2n1BgKrgCrs7vBF5r+h9Xh1jCHVEQ6luE1CKBHKx8CVBwrE/jWgb5H1y+n1pjLhFEZlR45Nyh1WOVlYbFYblIWqNkn2PORHj+ZV9aBuH2kWosA88gEG6/L6ZLNrZLNVvUDaeYxyAEfJIvlXjbz+alTY/TJPwtCH1j2vEUcvZUkkqEKRA2eSdnF/RU81eU0OuM8ccrG3rZIf/UTyf7wZXP8TtnSDUPGwkjNOvj6EEEFT9iCR9vPtmbNx5p/DLTT9R6gwkZo1DNpZI2Zb+dZI2Ei/b0PV+24n2z3r+pRhY9RHIp08loXZdxgm/AJEsFSVLKQSPHBNi6vo/WYU1U0kh//AJ5pG9ZBpAHdRvFWF2ELdekqLBBJHvqPwyjvIIpQFkW1Mbfu5oGqiCLVgGsUQdpANixmNSe1mMk76NT1WTTvEZ13RsWTfETtkjchkKk8q6VVE8hrBNE58+Jp17QhMncfcjRSf+ZDIrbX8fMKN/UBD5JqLrIDpgkNh4nCP4pY3V6Z0Uk7QybgUBoFuK5GW/T4oEjbU3vQg7AeRGquw2JfI/eF6vnz4o5fXUutJ/QWD6FF87Gljcew3O0ig/3HGcNEd6vpZOXQbb93j/Cw+9V/h9crPhzqiwaplYXppTsZb4DBiYmH3s7PuHH9nLHq0JXWQlWo2VP+ivJ/Qgn+WZs6mc3JWc10z6cNGXtEO9SPIr3U+VPlSPrYzDarUNI7SObd2LMfuTeW3xH1APJIifJ3XY/e3LAfzJOUmd8Y7fHjqbMYxmmzGMYDGMYDGMYDGMYDGMYDGMYDGMYHSOUgbeSt3VsAG8bgAa3VYBN+fGS9VskldNOkxhNmON23SLSAuxCCiaVvHsBZ4yBjJpdpEWmkZHlEbPElK8lNsQvwlsPB+g8eM+6MygSPEH2qn7xlViqoxr1kcBSeOeDnN5qBVWcRkLuUtwzKvJIFAjcWK2LAP1smTqNPqNP6GEkfdiRygbiSJvUhYKaIsXR8V4wqz+E9fHDMU1KN+yybVkO0gxMQe3J44q249wSQDQGW3xAixbniZZdPZUmN1LwtZFOvn8nraaBBN5kI0DKQWCuLb1gAEBPlDUW3E0Avyn6jOAq1scDyR8xF8+TV1+WTXdsZYY32mnWuDtZm7bDncgJKMPNcXxzwecuNF1RYpYnkA3xbDuif0TItKTa+ln2DYb+YpRN3me7gpgV3EgBGJa0og8AGj6fTRsC+Mn6TpbSRtKzLtiAtC4DUdxAA87b5NeBuNeLXX2vjNai31fVY3kZFcmPewjYeyuxZSAfHJNj2PnzkyTWkaWKEMN7Sylq8Kq7SK+3qdq+smYph5O4eR4vm75HHgV/iMlMTZaQujOAw9HzxuaYrZHFDj2NVeNMf4/wujr42eNPUyvIFPbrfW4CksiiTwG9vPNUbb4q+IgZJZIz6iO2p/sE2XP57TQ/0vtmLg1Gx4pFHrjYN4FEq+9fHJ+ln7fTOUz7mZvqxP8zePHp4TkeMYxmmzGMYDGMYDGMYDGMYDGMYDGMYDGMYDGMYDGMYDOkM7owZWKsPBB5AqqB9hWc8YV9FE8mvPtfNEgfqaF+13nTTy7WB9Pps0y8Nx8poWQaAo8C/ayc5YyDrE6gsSXA2uBsIvcVIAa/wc03uQTn06g7NgAC3d16r8nn7kL/uL9M44wbdUkCgUp7gcMH3cAAcDbXndzd/as5u5Jsmz/2c+YyhjGMIYxjAYxjAYxjAYxjAYxjAYxjAYxjAYxjAYxjAZL6PEr6iGNhaPLGrD6qzqrDj7E5EzvoFcyKYzTrcinjgxKZbF+9IaHuczViy/Zo5tK2qIWExlwyxozB/6kJSu9Kd0vJuqrgnzKb4YZpdquqxnjdR2iQS7DH6mJJ2Ay+flzg+j1Um1CVCvAsgRRGkfZklSvTGoUEyBCaF+kX4yvPU5/8AzHsSd36ESBQu/wAcGqH0yd+q1dfhZf8A48oZVaYqHaJE/dqX3zNIoDhZCqgdsmwzcMpr2zp0vQRNCqusZkZ9QtEyd1miiQxiMr6L3t4bg375Ut1GYlTurayMgVERVaNnKlVRQoppHPA8uSec6Nq5oi8O4Aq8galjLBz6JNr7dyghaNEWBiy/k3E3S9HEeohWQiRJJaUUQJIgqOsnmwrBxQ+zc590/TBqY0mVRFxJvWMbge20KqUWVwASZaI3geg1zwYcOqllmg7ZCvGqRxE0QDGL8sCOWLNXgbq8Zx/ynKSG3D5NgXtx9rZu3Fe3t7dbqNbfIvzjVOLaP4bAZR3Vc95UYKu6OmnEQ3Mj71JBDfKBRAD7uM8aT4b7iqwlqxHfoUKrzRrKAS0gOxVZbaieeFNZ518uriNmZHYSlC8exnWRJO52yxQOB3AWC/ISCQDWVsPUpU5V/wCwLKo20xpsjK7lO11UUGFMPrj+X5OImM6TyFiCQBSqtAUKRAg/WhZPuSc55pkxjGVDGMYDGMYDGMYDGMYDGMYDGMYDGMYDGM+oxBBHkEEcA8jnweD+WQebyX0vUCKeKQ/Ksilq5JTcN4r7rY/XL7USI6y91AVEOkI7axRsGljjZzuEZ8sxJ4+3GetT8LRxs0XeJlXaLBUqzS+mMFApMY3tGCxYg+rxxefKfbfjXuP4kiHNsCup9BC8jSqh7Y+xDhDWfOlfEMaxxiRmMqhTLI3dZpNksx2Eow3+h0ADHaeQaoXX6eJYHmDX+7WNWl7ccohkau4O25AK7t0e7kjb/FWTNX0FWl7dMssvcdBFtMUYi527GAa2o0LXbvQUczZi11X9V6qJUddzsN8BjVrIVY4HjkC38tsU/Or9ssIOowRzaiRZbMzsyuEnQxDubypKbW5BHgkXGAeDecepdEhjieVXd120gDoRv7jREs4QAjgGgPNjcfOd9HoYWci7kOlgOwxDarMmmtgxblvUSfT5Y5eaOuPVesxypJsZlV12ppwpVI37/cMnB2glb8W1yEeBZj9W6kkkEaB2ZlMfppwqLHEUNhiVDXVbKUgEsLoCzj6HFG8zOshEUbMWAQRuJdNLJSDb6WWgAbPqUmlqsg9P6RHJqBFbCOSGKQE7WdBK8SkXQBYb2pqHgeLOJ4pZUmXr8btLTdktJNskjjK0JGRo5G2erftWRCfIEvH4rmaf4j060S7kBkLWj7nkjlidpKVhH6hGWJYF9zVwMpen6GFptKSsjQzBiY2dd4Ku8db1QCrQH5fevvkrp/S4tT2UXfG/YMhYshBT9sePaRsG59rcNYBKgbclkXrPz2drtJvd13OSSWVtzCmJ8mgG/vDOWXsXS4xqYQrB4mTusC6MoSMuXQyEIjA9sjdQAL0fBubq+kxlNRO4pP3cqrE0ZW5V9Sq4DDYshdeOPRm/KM+NZXGTOrFe6dm3ZtjrbW2+0m7xxe67+95DyxmmMYyoYxjAYxjAYxjAYxjAYxjAYxjAYxjA991v7TchQeTyEACj8gAK+lcZ3TqMoKEyM6pIJAjszR7w24kqTXJu/c7j9ci4yLt2i1ciOZEkdXN26sysdxtrK0eTn0auUKy9yTazbmXe21m87mF0W4HJ54GcMmdK6XNqpO1BGZJNpbapUHaCAT6iB7j+eTh1y1Gtkk/rJJH/ANN2b/ic5rMwNhmBoCwxvatAC/oKWh/CPpnrVaZ43eN1KujFXU1aspojjjzl3pPgrqEsaSR6V2jdQ6MGjplYWp5e/BxuQ1agTdZlaPtEgLwGYF9zhVKgNbFfB5pQW/FZyEuocEMHYMAACGYEKKIAN+BQofYZO6x0HU6TZ+0QtH3L2bih3ba3VtJ/tD+eWEXwN1J4xIujk2kWLMatX+gzB/0q8m8Yuqz4lYbaZhs+SiRsN7vT/Z5549+c6HVSFt3cfd/a3Nu+ff5u/n9X58+c5yxsjFGUq6mmVgQykeQQeQftnnNI7S6uR2LPI7Ow2szOxYr9CSbI+2ef2h9uze2yq27jtqy1VdVZJ/MnOeMD7I5Y2xJPHJJJ4FDk/YAfpnzGMqGMYwGMYwGMYwGMYwGMYwGMYwGMYwGMYwGMYwGbz+hj/OZ/2eT/AJ48webz+hn/ADmf9nk/548x8n9a1h7Zv4x/zhrP9ok/9w5+wtp9c/R9AOnyCOYRQFySouPsUR6lYfNt9vbMv8R/0Y6uXUajUrLCEeSSQAtJu2liwBpKuvvmj1HRtVq+j9Pj0k3ZkEUDM3ckS0/ZyKtASeSprxxnHLKWRvGWbZrp2j1r9Z0en6lIJWjV5kHoKgbWrlVXnein+6M6fEPxnq4ut9pJSNMk0UZipdrKwTffF2dzUfbj6ZEh0Go6T1LR6nX6hZVkLoZN8khRNu0lmkAIUM4P5bsv+rf0fSajqi61JYv2VpI5W5beNgTcqgDawO3hrFbvHHNvjvvrS9Zn+mjQqmvjkUUZYQX+7IxTcfvt2j+6M/Ps2/8AS11dNRrwsbBlhjEZYGwZNxZwD71YH5g/TMRnX4/6xzy9mMYzbJjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMD1GAWAY0pIs/QXyf5Zsk6TpUeUM8SOZXESjUbNkSSItOS4o7d7c/Ndi+MxefKyWbVreqR6VF1DI+70RnTbNTvLF40WQMocsCrktRHPI8DOmo0+lVJKZFK6fcmzWbwJdshVUAe2N9tW48jhArBhj8ZnxN1pui6LSSLIdRqQSHjEfcdkO0EPqPTuPlfQDfJHHPGTtbBpk0rok43iNiVXVkgOGTtqiByr7lZ7oEDZ+H3xeMvj+zv5bF+m6QAhY4WcLHtVNaj7pGf5EXfbALQc+SfkUA3mX6nGiTypGbjWV1Q3doHIXn34rnI2MsmgxjGVDGMYDGMYDGMYDGMYDGMYDGMYDGMYDGMYDGMYDGMYDGMYDGMYUxjGRDGMZQxjGAxjGAxjGAxjGAxjGAxjGB//Z\" style=\"width: 225px;\" data-filename=\"download.jpg\"><br></p><p>xyz</p><p><img src=\"data:image/jpeg;base64,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\" style=\"width: 225px;\" data-filename=\"download.jpg\"><br></p>";
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(normalString);
            HtmlNode htmlPage = htmlDoc.DocumentNode;
            //await _emailRepository.ConfirmEmail(email);
            var c = new List<string>();
            var a = htmlPage.SelectNodes("//img");

            if (a != null)
            {
                foreach (var b in a)
                {
                    byte[] bytesImage = Convert.FromBase64String(b.Attributes["src"].Value.Split("base64,")[1]);
                    var storage = new FirebaseStorage("marinerum.appspot.com");
                    var stream = new MemoryStream(bytesImage);

                    long ticks = DateTime.Now.Ticks;
                    byte[] bytesTime = BitConverter.GetBytes(ticks);
                    string id = Convert.ToBase64String(bytesTime)
                                            .Replace('+', '_')
                                            .Replace('/', '-')
                                            .TrimEnd('=');

                    var downloadUrl = await storage.Child("images_by_months/" + DateTime.Now.Month + "/img" + "_" + id).PutAsync(stream);
                    //dua c -> byte

                    b.SetAttributeValue("src", downloadUrl);

                    //c.Add(b.Attributes["src"].Value);

                }
            }

            return Ok(htmlPage.InnerHtml);
        }

        //[HttpGet("ConfirmEmail")]
        //public async Task<IActionResult> ConfirmEmail(string token, string email)
        //{
        //    var user = await _emailRepository.FindByEmailAsync(email);

        //    if (user != null)
        //    {
        //        var result = await _emailRepository.ConfirmEmailAsync(user, token);
        //        if (result.Succeeded)
        //        {
        //            return Ok();
        //        }
        //    }

        //    return BadRequest();
        //}

    }
}
