using Aufy.Core;

namespace WebApi.Data;

public class MyUser: AufyUser
{
    public string? AboutMe { get; set; }
    public string? MySiteUrl { get; set; }
}