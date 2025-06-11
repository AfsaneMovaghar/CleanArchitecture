using MediatR;

namespace Application.Users.Commands.CreateUser;

public record CreateUserCommand : IRequest<long>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}