# Angular 2 SPA Web API - Explanation

### Configuring the ASP.NET Core Web API & IdentityServer4
Why should you use a service like IdentityServer4 for _Resource Owner Password Credentials grant_ (ROPC) in ASP.NET Core?
Sure, it would be possible to implement it, as in this very useful guide: [ASP.NET Core Token Authentication Guide](https://stormpath.com/blog/token-authentication-asp-net-core).
For two reasons:
- it's simple;
- it allows you to scale your application.

Let's see what the _Config.cs_ file contains for configuring IdentityServer4. The following is the identification of our client app:
```C#
// Clients want to access resources.
public static IEnumerable<Client> GetClients()
{
    // Clients credentials.
    return new List<Client>
    {
        // http://docs.identityserver.io/en/dev/reference/client.html.
        new Client
        {
            ClientId = "Angular2SPA",
            AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
            AllowAccessTokensViaBrowser = true,
            RequireClientSecret = false, // This client does not need a secret to request tokens from the token endpoint.
            AccessTokenLifetime = 3600, // Lifetime of access token in seconds: you need to handle the refresh token.

            AllowedScopes = new List<string>
            {
                "WebAPI"
            }
        }
    };
}
```
As you can see, you can add other clients with their own configuration.
Our Angular 2 app, identified as _Angular2SPA_:
- uses _ROPC_;
- doesn't use a _secret_ key: in a client application it would be useless because visible;
- has an _access token_ for 60 minutes, then need to refresh the token (It depends on the strategy that you want to adopt);
- can access to the _scopes_: in this case our Web API, called with a lot of imagination _WebAPI_.
```C#
// Scopes define the resources in the system.
public static IEnumerable<Scope> GetScopes()
{
    return new List<Scope>
    {
        new Scope
        {
            Name = "WebAPI",
            Description = "Web API for the Angular 2 SPA",

            // Defines which user claims will be included in the identity token
            // when this scope gets requested.
            Claims = new List<ScopeClaim>
            {
                new ScopeClaim("given_name"),
                new ScopeClaim("family_name"),
                new ScopeClaim("role")
            }
        }
    };
}
```
Note that we can define which user claims will be included in the identity token.

Because our Web API is in the same project, in _Configure_ method of _Startup.cs_ file, 
we add the authentication middleware:
```C#
// IdentityServer4.AccessTokenValidation: authentication middleware for the API.
app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
{
    Authority = "http://localhost:5000/",
    ScopeName = "WebAPI",

    RequireHttpsMetadata = false
});
```
We complete the configuration by adding IdentityServer in _ConfigureServices_ method:
```C#
// Adds IdentityServer.
services.AddDeveloperIdentityServer()
    .AddInMemoryScopes(Config.GetScopes())
    .AddInMemoryClients(Config.GetClients())
    .AddAspNetIdentity<ApplicationUser>(); // IdentityServer4.AspNetIdentity.
```
The extension method _AddAspNetIdentity_ to use the ASP.NET Identity requires another setting:
```C#
// Adds IdentityServer.
app.UseIdentityServer();
```
That's it for IdentityServer4!

Now we can add related services: Identity and for simplicity SQLite. 
```C#
// Identity & SQLite.
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
```
and
```C#
// Adds Identity.
app.UseIdentity();
```
Also we define the policy of access to the Web Api controllers. 
In our sample, we create two policies:
- _Manage Account_ only for _administrator_ role;
- _Access Resources_ for _administrator_ role and for _user_ role.
```C#
// Claims-Based Authorization: role claims.
services.AddAuthorization(options =>
{
    // Policy for dashboard: only administrator role.
    options.AddPolicy("Manage Accounts", policy => policy.RequireClaim("role", "administrator"));
    // Policy for resources: user or administrator role. 
    options.AddPolicy("Access Resources", policyBuilder => policyBuilder.RequireAssertion(
            context => context.User.HasClaim(claim => (claim.Type == "role" && claim.Value == "user")
                || (claim.Type == "role" && claim.Value == "administrator"))
        )
    );
});
```
We add the authorization to the _Identity_ controller, which is used by the dashboard:
```C#
[Route("api/[controller]")]
[Authorize(Policy = "Manage Accounts")] // Authorization policy for this API.
public class IdentityController : Controller
...
```
and to _Values_ controller, that returns the resources for the authenticated users:
```C#
[Route("api/[controller]")]
[Authorize(Policy = "Access Resources")] // Authorization policy for this API.
public class ValuesController : Controller
...
```
Remember: when we have defined our _scope_, we have also included the _role_ claim to allow the client application 
to know the user's role.

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

http://localhost:5000/.well-known/openid-configuration 

you should see the so-called discovery document. 
The discovery endpoint can be used to retrieve metadata about IdentityServer.
For an authentication, we need to send the request at the "token_endpoint":

http://localhost:5000/connect/token

For example, you can use [Postman](https://www.getpostman.com/) as client to send this POST request:
```
POST /connect/token HTTP/1.1
Host: localhost:5000
Content-Type: application/x-www-form-urlencoded

client_id=Angular2SPA&grant_type=password&username=admin%40gmail.com&password=Admin01*&scope=WebAPI
```
Note the _Content-Type_ as _x-www-form-urlencoded_, and parameters provided in the _body_. This is the response:
```Json
{
	"access_token": "eyJhbGci...",
	"expires_in": 3600,
	"token_type": "Bearer"
}
```
The user has been authenticated, and he has an _access token_ that will expire in 3600 seconds. 
You can use a tool like [JSON Web Token](https://www.jsonwebtoken.io/) to decode the JWT and see the payload (with our _scope claims_):
```Json
{
	"nbf": 1476886305,
	"exp": 1476889905,
	"iss": "http://localhost:5000",
	"aud": "http://localhost:5000/resources",
	"client_id": "Angular2SPA",
	"sub": "c0bb2220-8c99-46dc-ad39-b707f37f047f",
	"auth_time": 1476886304,
	"idp": "local",
	"given_name": "Admin",
	"family_name": "Admin",
	"role": "administrator",
	"scope": [
		"WebAPI"
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
And when, past the 60 minutes, the token expires? The user can no longer access resources. 
You can ask him to sign in again, or handle your refresh token strategy.

### Implementing the Angular 2 SPA
Ok, how do we transform the requests done via Postman in an Angular 2 app?

In this sample, to send unauthenticated requests for sign in and sign up, we use the Angular 2 _http_ module, 
as in _AuthenticationService_ class:
```TypeScript
/**
 * Tries to sign in the user.
 *
 * @param tokenEndpoint The endpoint to request the acces token
 * @param data The data requested by endpoint for authentication
 * @return The user's data
 */
public signin(tokenEndpoint: string, data: any): Observable<any> {

    // Encodes the data for the body.
    let body: string = "";
    for (let key in data) {
        if (body.length) {
            body += "&";
        }
        body += key + "=";
        body += encodeURIComponent(data[key]);
    }

    // Creates header.
    let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options: RequestOptions = new RequestOptions({ headers: headers });

    return this.http.post(tokenEndpoint, body, options)
        .map((res: Response) => {

            let body: any = res.json();

            // Sign in successful if there's an access token in the response.
            if (body != null && typeof body.access_token !== 'undefined') {

                // Stores access token in local storage to keep user signed in.
                localStorage.setItem('id_token', body.access_token);

                // Decodes the token.
                this.decodeToken();

            }

        }).catch((error: any) => {

            // Error on post request.
            return Observable.throw(error);

        });

}
```
To send authenticated requests, as in _ResourcesComponent_ class, we use angular2-jwt library, that builds for us the header with the authorization token:
```TypeScript
// Sends an authenticated request.
this.authHttp.get("/api/values")
    .subscribe(
    (res: any) => {

        this.values = res.json();

    },
    (error: any) => {

        console.log(error);

    });
```
angular2-jwt also provides some very useful helpers, as _decodeToken_ method to decode the token, 
and _tokenNotExpired_ method to check the expiration of the token.

### Building the Angular 2 app with AoT compilation & webpack

For production, we build the Angular 2 app through [ngc compiler](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) & webpack. 
To do this, after the AoT compilation, in _webpack.config.js_ file we set as entry point _main-aot.ts_:
```JavaScript
// In production mode, we use AoT compilation & minification.
module.exports = {
    entry: {
        'app-aot': './app/main-aot.js'
    },
	...
```
and as output the _wwwroot_ folder (as set in _Startup.cs_):
```JavaScript
output: {
    path: "./wwwroot/",
    filename: "dist/[name].bundle.js",
    chunkFilename: 'dist/[name].chunk.js'
},
```
Finally, we ask webpack to insert the script of the bundle in our _index.html_:
```JavaScript
// Adds script for the bundle in index.html.
new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: 'body',
    template: 'app/index.html'
})
```