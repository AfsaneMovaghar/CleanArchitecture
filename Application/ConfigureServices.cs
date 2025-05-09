using Application.Common.Interface;
using Application.Services;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application;

public static class ConfigureServices
{
    public static IServiceCollection RegisterApplicationServices(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        //services.AddMediatR(cfg =>
        //{
        //    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        //    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
        //});

        services.AddSingleton<IJwtTokenService, JwtTokenService>();
        return services;
    }
}