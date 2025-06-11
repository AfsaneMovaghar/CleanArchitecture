using Application.Common;
using Domain.Entities;
using MediatR;

namespace Application.Users.Commands.CreateUser;

public class CreateUserCommandHandler(IApplicationUnitOfWork applicationUnitOfWork)
    : IRequestHandler<CreateUserCommand, long>
{
    private readonly IApplicationUnitOfWork _uow = applicationUnitOfWork;

    public async Task<long> Handle(CreateUserCommand request, CancellationToken cancellationToken = default)
    {
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email
        };
        _uow.Users.Add(user);
        await _uow.SaveChangesAsync(cancellationToken);
        return user.Id;
    }
}