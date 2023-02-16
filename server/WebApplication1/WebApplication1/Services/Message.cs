using MimeKit;

namespace WebApplication1.Services
{
    public class Message
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<KeyValuePair<string, string>> PlaceHolders { get; set; }
    }
}
