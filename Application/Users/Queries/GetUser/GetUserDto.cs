using Domain.Enums;

namespace Application.Users.Queries.GetUser;

public record GetUserDto(long Id, Gender Gender, string Email);
