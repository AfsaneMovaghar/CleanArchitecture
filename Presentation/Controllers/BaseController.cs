using Presentation.Filter;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace Presentation.Controllers;

[Route("[controller]/[action]"), CatchExceptionFilter, ApiController]
public abstract class BaseController : ControllerBase
{
    private ISender? _mediator;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}
