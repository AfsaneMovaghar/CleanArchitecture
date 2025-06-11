using Domain.Enums;

namespace Application.Users.Queries.GetUser;

public record GetUserDto(long Id,string FirstName,
     string LastName,
     string Email,
     string UserName,
      string Address,
    Gender Gender);
