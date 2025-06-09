
using System.Text.RegularExpressions;
using System.Text;

namespace Domain.Entities;

public class User : BaseEntity
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Address { get; set; }
    public Gender Gender { get; set; }

    public static User Create(string email, string password, string firstName, string lastName, Gender gender, string address, string userName)
    {
        
        return new User
        {
            Email = email,
            Address = address,
            FirstName = firstName,
            LastName = lastName,
            Gender = gender,
            Password = password,
            UserName = userName
        };
    }


    

}