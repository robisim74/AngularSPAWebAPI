# Angular SPA Web API

> **Angular v5** Single Page Application with an ASP.NET Core Web API that uses token authentication. 
> The OAuth 2.0 _Resource Owner Password Credentials grant_ (ROPC) is implemented using IdentityServer4 
> and ASP.NET Core Identity as membership system with a SQLite database.

Get the [Changelog](https://github.com/robisim74/AngularSPAWebAPI/blob/master/CHANGELOG.md).

[Live example](http://angularspawebapi.azurewebsites.net) and its [explanation](https://github.com/robisim74/AngularSPAWebAPI/blob/master/EXPLANATION.md).

**Links**
- [IdentityServer4](https://identityserver4.readthedocs.io/en/release/) | [Protecting an API using Passwords](https://identityserver4.readthedocs.io/en/release/quickstarts/2_resource_owner_passwords.html)
- [ASP.NET Core - Security](https://docs.microsoft.com/en-us/aspnet/core/security/) | [Role based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles)

> ROPC grant requires the use of SSL.

> For more complex scenarios, where web services are required by more than one application or third-party applications, 
you should use an OpenID Connect flow.

**Links**
- [IDENTITYSERVER4, WEB API AND ANGULAR IN A SINGLE ASP.NET CORE PROJECT](https://damienbod.com/2016/10/01/identityserver4-webapi-and-angular2-in-a-single-asp-net-core-project/)

The same scenarios are also supported by [AspNet.Security.OpenIdConnect.Server](https://github.com/aspnet-contrib/AspNet.Security.OpenIdConnect.Server) and [openiddict-core](https://github.com/openiddict/openiddict-core).

**Links**
- [Creating your own OpenID Connect server with ASOS](http://kevinchalet.com/2016/07/13/creating-your-own-openid-connect-server-with-asos-introduction/)

## Project structure
**AngularSPAWebAPI** _ASP.NET Core Web API project_
- **wwwroot** _Root for Angular application deployment_
- **app** _Angular application_
- **Controllers**
	- **IdentityController.cs** _Identity APIs_
	- **ValuesController.cs** _Resources APIs_
- **Data** _Entity Framework_ migrations
	- **DbInitializer.cs** _Provides method to populate the db_
- **Models**
	- **ApplicationUser.cs** _Profile data for application users_
- **Config.cs** _IdentityServer4 configuration_
- **IdentityDB.sqlite** _SQLite database_
- **package.json** _Packages for Angular app_
- **Startup.cs** _Web API configuration_
- **tsconfig.json** & **tsconfig-aot.json** _TypeScript & ngc compiler options_
- **webpack.config.js** _Webpack configuration file for development & production of Angular app_

## Installing
- Requirements
	- At least [.NET Core 2.0](https://www.microsoft.com/net/download/core)
	- At least _node 6.9_ and _npm 4_
- Edit `ConnectionStrings` in _appsettings.json_
#### Visual Studio 2017
- Make sure your configuration for external tools is correct:
	_Tools_ > _Options_ > _Projects and Solutions_ > _Web Package Management_ > _External Web Tools_
	```
	.\node_modules\.bin
	$(PATH)
	...
	```
- Wait for packages restoring and build the solution
#### Command line & .NET Core CLI
Go to the _AngularSPAWebAPI_ project folder:
- `npm install`
- Restore & build the solution:
	```Shell
	dotnet restore
	dotnet build
	```

## Running
To run _npm_ commands in Visual Studio you can use [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner) extension.

### Development
For the Angular app, we use JiT compilation, with source maps & [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/).
#### Visual Studio 2017
- Start debugging
#### Command line & .NET Core CLI
- Set _Development_ as environment variable: [Working with multiple environments](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments)
- `dotnet watch run`: [Developing ASP.NET Core apps using dotnet watch](https://docs.microsoft.com/en-us/aspnet/core/tutorials/dotnet-watch)

Make the changes: the browser will update without refreshing.

### Staging / Production
For the Angular app, we use [AoT compilation](https://angular.io/guide/aot-compiler), tree shaking & minification.
#### Visual Studio 2017
- `npm run build`
- Use _AngularSPAWebAPI_ profile that has _Staging_ as environment variable
- Start debugging
#### Command line & .NET Core CLI
- `npm run build`
- Set _Staging_ as environment variable
- `dotnet run`

## EF Core commands
- Package Manager Console
	```Shell
	Add-Migration [Name] -OutputDir Data/Migrations
	Update-Database
	```
- .NET Core CLI
	```Shell
	dotnet ef migrations add [Name] -o Data/Migrations
	dotnet ef database update
	```

## Changing db
To use another database:
- Edit `ConnectionStrings` in _appsettings.json_
- Edit in _Startup.cs_:
```C#
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
```

## Swagger
- Navigate to `http://localhost:5000/swagger/v1/swagger.json` to see the document generated that describes the endpoints
- Swagger UI can be viewed by navigating to `http://localhost:5000/swagger`

To test the APIs, remove the policy from controllers.

## License
MIT
