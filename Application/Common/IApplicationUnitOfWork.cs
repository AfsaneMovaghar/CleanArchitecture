﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common;

public interface IUnitOfWork : IDisposable, IAsyncDisposable
{
    /// <summary>
    /// Save all entities in to database.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Task<Result> SaveChangesAsync(CancellationToken cancellationToken = default);
}

public interface IApplicationUnitOfWork : IUnitOfWork
{
    public DbSet<User> Users { get; }
}
