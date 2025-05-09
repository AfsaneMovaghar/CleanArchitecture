using Application.Common.Interface;
using Application.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

public class AuthenticationController(IJwtTokenService jwtTokenService) : BaseController
{
    private readonly IJwtTokenService _jwtTokenService = jwtTokenService;
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDTO model)
    {
        if (model.Username == "admin" && model.Password == "123")
        {
            var token = _jwtTokenService.GenerateJwtToken(model.Username);
            return Ok(new { token });
        }

        return Unauthorized();
    }
}
