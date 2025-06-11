using MediatR;

namespace Application.Users.Queries.GetUser;

public record GetUserQuery(long Id) : IRequest<GetUserDto>;