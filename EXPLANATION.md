# Angular SPA Web API - Explanation

### Configuring the ASP.NET Core Web API & IdentityServer4
Let's see what the _Config.cs_ file contains for configuring _IdentityServer4_. The following is the identification of our client app:
```C#
// Clients want to access resources.
public static IEnumerable<Client> GetClients()
{
    // Clients credentials.
    return new List<Client>
    {
        // http://docs.identityserver.io/en/release/reference/client.html.
        new Client
        {
            ClientId = "AngularSPA",
            AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
            AllowAccessTokensViaBrowser = true,
            RequireClientSecret = false, // This client does not need a secret to request tokens from the token endpoint.

            AccessTokenLifetime = 900, // Lifetime of access token in seconds.

            AllowedScopes = {
                IdentityServerConstants.StandardScopes.OpenId, // For UserInfo endpoint.
                IdentityServerConstants.StandardScopes.Profile,
                "roles",
                "WebAPI"
            },
            AllowOfflineAccess = true, // For refresh token.
            RefreshTokenUsage = TokenUsage.OneTimeOnly,
            AbsoluteRefreshTokenLifetime = 7200,
            SlidingRefreshTokenLifetime = 900,
            RefreshTokenExpiration = TokenExpiration.Sliding,
            AllowedCorsOrigins = new List<string>
            {
                "http://localhost:4200"
            } // Only for development.
        }
    };
}
```
As you can see, you can add other clients with their own configuration.
Our Angular app, identified as _AngularSPA_:
- uses _ROPC_;
- doesn't use a _secret_ key: in a client application it would be useless because visible;
- has an _access token_ for 15 minutes, then need to refresh the token;
- can access to the _scopes_: in this case our Web API, called _WebAPI_, and user roles;
- has _OfflineAccess_ for _refresh token_;
- _refresh token_ has a sliding lifetime of 15 minutes and a maximum lifetime of 2 hours: the _refresh token_ has a lifetime equal to or greater than the _access token_ to allow the user to remain authenticated, but for a maximum of 2 hours.

The following are the resources:
```C#
// Identity resources (used by UserInfo endpoint).
public static IEnumerable<IdentityResource> GetIdentityResources()
{
    return new List<IdentityResource>
    {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
        new IdentityResource("roles", new List<string> { "role" })
    };
}

// Api resources.
public static IEnumerable<ApiResource> GetApiResources()
{
    return new List<ApiResource>
    {
        new ApiResource("WebAPI" ) {
            UserClaims = { "role" }
        }
    };
}
```

We add IdentityServer in _ConfigureServices_ method of _Startup.cs_ file:
```C#
// Adds IdentityServer.
services.AddIdentityServer()
    // The AddDeveloperSigningCredential extension creates temporary key material for signing tokens.
    // This might be useful to get started, but needs to be replaced by some persistent key material for production scenarios.
    // See http://docs.identityserver.io/en/release/topics/crypto.html#refcrypto for more information.
    .AddDeveloperSigningCredential()
    .AddInMemoryPersistedGrants()
    // To configure IdentityServer to use EntityFramework (EF) as the storage mechanism for configuration data (rather than using the in-memory implementations),
    // see https://identityserver4.readthedocs.io/en/release/quickstarts/8_entity_framework.html
    .AddInMemoryIdentityResources(Config.GetIdentityResources())
    .AddInMemoryApiResources(Config.GetApiResources())
    .AddInMemoryClients(Config.GetClients())
    .AddAspNetIdentity<ApplicationUser>(); // IdentityServer4.AspNetIdentity.
```
The extension method _AddAspNetIdentity_ to use the ASP.NET Identity requires another setting in _Configure_ method:
```C#
app.UseIdentityServer();
```
Because our Web API is in the same project, we add the authentication middleware:
```C#
services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
    .AddIdentityServerAuthentication(options =>
    {
        options.Authority = "http://localhost:5000";
        options.RequireHttpsMetadata = false;

        options.ApiName = "WebAPI";
    });
```

Now we can add related services, SQLite & Identity: 
```C#
// SQLite & Identity.
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Identity options.
services.Configure<IdentityOptions>(options =>
{
    // Password settings.
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = false;
    // Lockout settings.
    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.MaxFailedAccessAttempts = 3;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(1);
});
```
and add Identity to the pipeline:
```C#
app.UseIdentity();
```
Also we define the policy of access to the Web Api controllers. 
In our sample, we create two policies:
- _Manage Account_ only for _administrator_ role;
- _Access Resources_ for _administrator_ and _user_ roles.
```C#
// Role based Authorization: policy based role checks.
services.AddAuthorization(options =>
{
    // Policy for dashboard: only administrator role.
    options.AddPolicy("Manage Accounts", policy => policy.RequireRole("administrator"));
    // Policy for resources: user or administrator roles. 
    options.AddPolicy("Access Resources", policy => policy.RequireRole("administrator", "user"));
});
```
We add the authorization to the _Identity_ controller, which is used by the dashboard:
```C#
[Route("api/[controller]")]
// Authorization policy for this API.
[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Manage Accounts")]
public class IdentityController : Controller
...
```
and to _Values_ controller, that returns the resources for the authenticated users:
```C#
[Route("api/[controller]")]
// Authorization policy for this API.
[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
public class ValuesController : Controller
...
```
When we have defined our _APIResource_, we have included the user claim _role_ to allow the user to access the resources.

Finally, we set the startup on the entry point of the client application:
```C#
// Microsoft.AspNetCore.StaticFiles: API for starting the application from wwwroot.
// Uses default files as index.html.
app.UseDefaultFiles();
// Uses static file for the current path.
app.UseStaticFiles();
```

### Understanding how it works
It's important to understand and observe how the authentication and authorization services work, 
in order to implement the client app.

If you debug the app and navigate the browers to:

`http://localhost:5000/.well-known/openid-configuration`

you should see the so-called discovery document. 
The discovery endpoint can be used to retrieve metadata about IdentityServer.
For an authentication, we need to send the request at the `token_endpoint`:

`http://localhost:5000/connect/token`

For example, you can use [Postman](https://www.getpostman.com/) as client to send this POST request:
```
POST /connect/token HTTP/1.1
Host: localhost:5000
Content-Type: application/x-www-form-urlencoded

client_id=AngularSPA&grant_type=password&username=admin%40gmail.com&password=Admin01*&scope=WebAPI+offline_access+openid+profile+roles
```
Note the _Content-Type_ as _x-www-form-urlencoded_, and parameters provided in the _body_. This is the response:
```Json
{
    "access_token": "eyJhbGci...",
    "expires_in": 900,
    "token_type": "Bearer",
    "refresh_token": "f78a2edc..."
}
```
The user has been authenticated, and he has an _access token_ that will expire in 900 seconds, but he has also a _refresh token_.
You can use a tool like [JSON Web Token](https://www.jsonwebtoken.io/) to decode the JWT and see the payload (with our _scope claims_):
```Json
{
  "nbf": 1496739308,
  "exp": 1496740208,
  "iss": "http://localhost:5000",
  "aud": [
    "http://localhost:5000/resources",
    "WebAPI"
  ],
  "client_id": "AngularSPA",
  "sub": "c70b4a4c-4041-46cc-8a16-259f06543768",
  "auth_time": 1496739308,
  "idp": "local",
  "role": "administrator",
  "scope": [
    "openid",
    "profile",
    "roles",
    "WebAPI",
    "offline_access"
  ],
  "amr": [
    "pwd"
  ]
}
```
Now we can send a GET request to our Web API in this way:
```
GET /api/values HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGci...
```
This request contains a header parameter named _Authorization_ and its value is the bearer token. The response:
```Json
[
    "value1",
    "value2"
]
```
And when, past the 15 minutes, the token expires? The user can no longer access resources. 
You can ask him to sign in again, or handle a refresh token strategy: to get a new access token, 
you can send a POST request, with `grant_type` set to `refresh_token` and `refresh token` as parameters:
```
POST /connect/token HTTP/1.1
Host: localhost:5000
Content-Type: application/x-www-form-urlencoded

client_id=AngularSPA&grant_type=refresh_token&refresh_token=f78a2edc...
```

### Implementing the Angular SPA
Ok, how do we transform the requests done via Postman in an Angular app?

In this sample, we use [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc) library to:
 - load the discovery document
 - get the access token
 - get the refresh token 
 - get the user info

Then we use a scheduler to request a new _access token_ before it expires through the _refresh token_:
```TypeScript
/**
 * Strategy for refresh token through a scheduler.
 * Will schedule a refresh at the appropriate time.
 */
public scheduleRefresh(): void {
    const source: Observable<number> = interval(
        this.calcDelay(this.getAuthTime())
    );

    this.refreshSubscription = source.subscribe(() => {
        this.oAuthService.refreshToken()
            .then(() => {
                // Scheduler works.
            })
            .catch((error: any) => {
                this.handleRefreshTokenError();
            });
    });
}

/**
 * Case when the user comes back to the app after closing it.
 */
public startupTokenRefresh(): void {
    if (this.oAuthService.hasValidAccessToken()) {
        const source: Observable<number> = timer(this.calcDelay(new Date().valueOf()));

        // Once the delay time from above is reached, gets a new access token and schedules additional refreshes.
        source.subscribe(() => {
            this.oAuthService.refreshToken()
                .then(() => {
                    this.scheduleRefresh();
                })
                .catch((error: any) => {
                    this.handleRefreshTokenError();
                });
        });
    }
}
```

To send authenticated requests, as in _ResourcesComponent_ class, we add the token to the header:
```TypeScript
// Sends an authenticated request.
this.http
    .get("/api/values", {
        headers: this.authenticationService.getAuthorizationHeader()
    })
    .subscribe((data: any) => {
        this.values = data;
    },
    (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
            console.log('An error occurred:', error.error.message);
        } else {
            console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
    });
```
