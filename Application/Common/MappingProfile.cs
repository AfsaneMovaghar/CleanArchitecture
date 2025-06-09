using Application.Users.Queries.GetUser;
using AutoMapper;
using Domain.Entities;

namespace Application.Common;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, GetUserDto>().ReverseMap();
    }
}
