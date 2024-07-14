using Aufy.Core.Endpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApi.Data;

namespace WebApi;

public class SignUpExtension : ISignUpEndpointEvents<MyUser, MySignUpRequest>
{
    public Task<ProblemHttpResult?> UserCreatingAsync(MySignUpRequest model, HttpRequest httpRequest, MyUser user)
    {
        user.AboutMe = model.AboutMe;
        user.MySiteUrl = model.MySiteUrl;
        
        return Task.FromResult<ProblemHttpResult?>(null);
    }
}

public class SignUpExternalExtension : ISignUpExternalEndpointEvents<MyUser, MySignUpExternalRequest>
{
    public Task<ProblemHttpResult?> UserCreatingAsync(MySignUpExternalRequest model, HttpRequest httpRequest, MyUser user)
    {
        user.AboutMe = model.AboutMe;
        user.MySiteUrl = model.MySiteUrl;
        
        return Task.FromResult<ProblemHttpResult?>(null);
    }
}