namespace WebApplication1.Dto;

// public class DateTimeDto
// {
//     public int[] NumbByDays { get; set; }
//     public int[] NumbByMonths { get; set; }
//     public int[] NumbByYears { get; set; }
// }


public class DateTimeDto
{
    public Dictionary<string, int> NumbByDays { get; set; }
    public Dictionary<string, int> NumbByMonths { get; set; }
    public Dictionary<string, int> NumbByYears { get; set; }
}
