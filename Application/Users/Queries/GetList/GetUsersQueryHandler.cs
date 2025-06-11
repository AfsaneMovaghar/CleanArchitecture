using Application.Common;
using Application.Users.Queries.GetUser;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetList;

public class GetUsersQueryHandler(IApplicationUnitOfWork applicationUnitOfWork, IMapper mapper)
: IRequestHandler<GetUsersQuery, List<GetUserDto>>
{
    private readonly IApplicationUnitOfWork _uow = applicationUnitOfWork;
    private readonly IMapper _mapper = mapper;
    public async Task<List<GetUserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken = default)
    {
        var users = await _uow.Users
                               .AsNoTracking()
                               .ToListAsync(cancellationToken);

        return _mapper.Map<List<GetUserDto>>(users);
    }
}