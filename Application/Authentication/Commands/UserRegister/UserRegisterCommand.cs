using Application.Common;
using Domain.Enums;
using MediatR;

namespace Application.Authentication.Commands.UserRegister;

public record UserRegisterCommand(
     string FirstName,
     string LastName,
     string Email,
     string UserName,
     string Password,
      string Address,
Gender Gender
) : IRequest<Result>;