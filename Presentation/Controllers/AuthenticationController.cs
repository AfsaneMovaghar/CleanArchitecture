using Application.Authentication.Commands.UserRegister;
using Application.Authentication.Queries.Login;
using Application.Common;
using Application.Users.Queries.GetList;
using Application.Users.Queries.GetUser;
using CleanArchitecture.Application.Authentication.Queries.Login;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

public class AuthenticationController : BaseController
{
    [HttpPost]
    public async Task<ActionResult<Result>> Register([FromBody] UserRegisterCommand userRegisterCommand,
        CancellationToken cancellationToken = default)
       => await Mediator.Send(userRegisterCommand, cancellationToken);

    [HttpPost]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginQuery loginQuery,
        CancellationToken cancellationToken = default)
       => await Mediator.Send(loginQuery, cancellationToken);

    [HttpPost]
    public async Task<ActionResult<GetUserDto>> GetUserById([FromBody] GetUserQuery query,
    CancellationToken cancellationToken = default)
   => await Mediator.Send(query, cancellationToken);

    [HttpPost]
    public async Task<ActionResult<List<GetUserDto>>> GetUsers([FromBody] GetUsersQuery query,
    CancellationToken cancellationToken = default)
   => await Mediator.Send(query, cancellationToken);
}
