using Domain.Enums;

namespace Application.Users.Queries.GetUser;

public record GetUserDto(Guid Id, Gender Gender, string Email);
