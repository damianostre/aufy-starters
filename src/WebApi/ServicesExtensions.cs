using AspNet.Security.OAuth.Discord;
using AspNet.Security.OAuth.GitHub;
using Aufy.Core;
using Aufy.Core.AuthSchemes;
using Aufy.Core.Endpoints;
using Aufy.EntityFrameworkCore;
using Aufy.FluentEmail;
using WebApi.Data;

namespace WebApi;

public static class ServicesExtensions
{
    public static IServiceCollection SetupAufy(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAufy<MyUser>(configuration)
            .AddProvider(GitHubAuthenticationDefaults.AuthenticationScheme, (auth, options) =>
            {
                auth.AddGitHub(o => o.Configure(GitHubAuthenticationDefaults.AuthenticationScheme, options));
            })
            .AddProvider(DiscordAuthenticationDefaults.AuthenticationScheme, (auth, options) =>
            {
                auth.AddDiscord(o => o.Configure(DiscordAuthenticationDefaults.AuthenticationScheme, options));
            })
            .AddDefaultCorsPolicy()
            .AddEntityFrameworkStore<ApplicationDbContext, MyUser>()
            .AddFluentEmail();
        // Uncomment the line below to use custom signup models
            // .UseAufyCustomSignup();
        
        return services;
    }
}


public static class AufyBuilderExtensions
{
    /// <summary>
    /// Use this method to add custom signup models
    /// </summary>
    /// <param name="builder"></param>
    /// <returns></returns>
    public static AufyServiceBuilder<MyUser> UseAufyCustomSignup(this AufyServiceBuilder<MyUser> builder)
    {
        builder
            .UseSignUpModel<MySignUpRequest>()
            .UseExternalSignUpModel<MySignUpExternalRequest>();

        
        builder.Services.AddScoped<ISignUpExternalEndpointEvents<MyUser, MySignUpExternalRequest>, SignUpExternalExtension>();
        builder.Services.AddScoped<ISignUpEndpointEvents<MyUser, MySignUpRequest>, SignUpExtension>();
        
        return builder;
    }
}