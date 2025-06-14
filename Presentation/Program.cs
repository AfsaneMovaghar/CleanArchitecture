using Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Presentation;
var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.RegisterApplicationServices()
                    .RegisterInfrastructureServices(builder.Configuration)
                    .RegisterPresentationServices();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();
{
    app.UseCors(options =>
    options.WithOrigins("http://localhost:4200")
           .AllowAnyMethod()
           .AllowAnyHeader());
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}
