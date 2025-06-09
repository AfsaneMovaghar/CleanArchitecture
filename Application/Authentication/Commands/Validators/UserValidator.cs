using Application.Authentication.Commands.UserRegister;
using FluentValidation;

namespace Application.Authentication.Commands.Validators;

public class UserValidator : AbstractValidator<UserRegisterCommand>
{
    public UserValidator()
    {
        RuleFor(user => user.Email)
            .NotEmpty().WithMessage("ایمیل نمی‌تواند خالی باشد.")
            .EmailAddress().WithMessage("فرمت ایمیل معتبر نیست.");

        RuleFor(user => user.Password)
            .NotEmpty().WithMessage("رمز عبور نمی‌تواند خالی باشد.")
            .MinimumLength(8).WithMessage("رمز عبور باید حداقل ۸ کاراکتر داشته باشد.");

        RuleFor(user => user.FirstName)
            .NotEmpty().WithMessage("نام نمی‌تواند خالی باشد.")
            .MaximumLength(50).WithMessage("نام نباید بیشتر از ۵۰ کاراکتر باشد.");

        RuleFor(user => user.LastName)
            .NotEmpty().WithMessage("نام خانوادگی نمی‌تواند خالی باشد.")
            .MaximumLength(50).WithMessage("نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد.");

        RuleFor(user => user.UserName)
            .NotEmpty().WithMessage("نام کاربری نمی‌تواند خالی باشد.")
            .Matches(@"^\w+$").WithMessage("نام کاربری فقط باید شامل حروف، اعداد و زیرخط باشد.");

        RuleFor(user => user.Address)
            .NotEmpty().WithMessage("آدرس نمی‌تواند خالی باشد.");

        RuleFor(user => user.Gender)
            .IsInEnum().WithMessage("مقدار جنسیت معتبر نیست.");
    }
}

