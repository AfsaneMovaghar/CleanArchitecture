namespace Application.Common.Interface;
public interface IJwtTokenService
{
    public string GenerateJwtToken(string username);
}
