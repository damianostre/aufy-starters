using WebApi.Data;
using Aufy.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using WebApi;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
    .ReadFrom.Configuration(hostingContext.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.SetupAufy(builder.Configuration);

builder.Services.Configure<IdentityOptions>(options => { options.SignIn.RequireConfirmedEmail = false; });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapAufyEndpoints();

app.MapFallbackToFile("index.html");

try
{
    app.Run();
} 
catch (Exception e)
{
    Log.Fatal(e, "An error occurred while starting the application");
}
