using Aufy.Core;
using Aufy.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Data;

public class ApplicationDbContext : AufyDbContext<MyUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
}