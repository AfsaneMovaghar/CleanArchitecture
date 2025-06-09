using Application.Common;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Infrastructure;

public static class ConfigureServices
{
  public static IServiceCollection RegisterInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(configuration
        .GetConnectionString("DefaultConnection")
        , x => x.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
    services.AddMediatR(cfg =>
    {
      cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
    });
    services.AddScoped<IApplicationUnitOfWork, ApplicationUnitOfWork>();

    return services;
  }
}
