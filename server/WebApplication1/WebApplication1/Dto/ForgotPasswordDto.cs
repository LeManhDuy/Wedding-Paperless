using System.ComponentModel.DataAnnotations;


namespace WebApplication1.Dto
{
    public class ForgotPasswordDto
    {
        [Required, MaxLength(6, ErrorMessage = "Please enter enough 6 numbers")]
        public string Code {get; set;}

        [Required]
        public string Password {get; set;}

        [Required]
        public string ConfirmPassword {get; set;}
    }
}