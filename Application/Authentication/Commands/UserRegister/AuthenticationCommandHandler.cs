using Application.Authentication.Commands.Validators;
using Application.Common;
using Domain.Entities;
using MediatR;

namespace Application.Authentication.Commands.UserRegister;

public class AuthenticationCommandHandler(IApplicationUnitOfWork unitOfWork)
    : IRequestHandler<UserRegisterCommand, Result>
{
    private readonly IApplicationUnitOfWork _uow = unitOfWork;

    public async Task<Result> Handle(UserRegisterCommand request, CancellationToken cancellationToken = default)
    {
        //var validator = new UserValidator();
        //var result = validator.Validate(request);

        //if (!result.IsValid)
        //{
        //    foreach (var error in result.Errors)
        //    {
        //        Console.WriteLine(error.ErrorMessage);
        //    }
        //}
        var model = User.Create(

             request.Email,
             request.Password,
             request.FirstName,
             request.LastName,
             request.Gender,
             request.Address,
             request.UserName
        );
        _uow.Users.Add(model);
        return await _uow.SaveChangesAsync(cancellationToken);
    }
}