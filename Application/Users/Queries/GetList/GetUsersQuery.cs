using Application.Users.Queries.GetUser;
using MediatR;

namespace Application.Users.Queries.GetList;

public class GetUsersQuery:IRequest<List<GetUserDto>>;
