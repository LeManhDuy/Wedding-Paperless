namespace WebApplication1.Dto
{
    public class PasswordDto
    {
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}