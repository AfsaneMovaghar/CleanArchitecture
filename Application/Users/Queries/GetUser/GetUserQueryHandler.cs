﻿using Application.Common;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUser;

public class GetUserQueryHandler(IApplicationUnitOfWork applicationUnitOfWork, IMapper mapper)
    : IRequestHandler<GetUserQuery, GetUserDto>
{
    private readonly IApplicationUnitOfWork _uow = applicationUnitOfWork;
    private readonly IMapper _mapper = mapper;
    public async Task<GetUserDto> Handle(GetUserQuery request, CancellationToken cancellationToken = default)
    {
        User? user = await _uow.Users
                               .AsNoTracking()
                               .Where(x => x.Id == request.Id)
                               .FirstOrDefaultAsync(cancellationToken);
        return _mapper.Map<GetUserDto>(user);
    }
}