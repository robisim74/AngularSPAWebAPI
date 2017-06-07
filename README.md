# Angular SPA Web API

> **Angular 2+** Single Page Application with an ASP.NET Core Web API that uses token authentication. 
> The OAuth 2.0 _Resource Owner Password Credentials grant_ (ROPC) is implemented using IdentityServer4 
> and ASP.NET Core Identity as membership system with a SQLite database.

Get the [Changelog](https://github.com/robisim74/AngularSPAWebAPI/blob/master/CHANGELOG.md).

[Live example](http://angularspawebapi.azurewebsites.net) and its [explanation](https://github.com/robisim74/AngularSPAWebAPI/blob/master/EXPLANATION.md).

**Links**
- [Talk to a remote server with an HTTP Client](https://angular.io/docs/ts/latest/guide/server-communication.html)
- [IdentityServer4](https://identityserver4.readthedocs.io) | [Protecting an API using Passwords](http://docs.identityserver.io/en/dev/quickstarts/2_resource_owner_passwords.html)
- [ASP.NET Core - Security](https://docs.asp.net/en/latest/security/index.html) | [Role based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles)

For more complex scenarios, where web services are required by more than one application or third-party applications, 
you should consider to use an OpenID Connect flow.

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
- **Models**
	- **ApplicationUser.cs** _Profile data for application users_
- **Services**
	- **DbService.cs** _Provides method to populate the db_
- **build.js** _Angular app building process for production_
- **Config.cs** _IdentityServer4 configuration_
- **IdentityDB.sqlite** _SQLite database_
- **package.json** _Packages for Angular app_
- **Startup.cs** _Web API configuration_
- **tsconfig.json** & **tsconfig-aot.json** _TypeScript & ngc compiler options_
- **webpack.config.js** _Webpack configuration file for development & production of Angular app_

## Installing
- Use Visual Studio 2017 and [.NET Core 1.1.2 runtime](https://www.microsoft.com/net/download/core#/runtime)
	- VS 2015: [code](https://github.com/robisim74/AngularSPAWebAPI/tree/VS_2015)
- Edit `ConnectionStrings` in _appsettings.json_
- Wait for packages restoring and build the solution
- Start debugging

## Editing
#### Changing db
To use another database:
- Edit `ConnectionStrings` in _appsettings.json_
- Edit in _Startup.cs_:
```C#
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
```

#### Changing the Angular app
Before running the following commands, make sure your configuration for external tools is correct:
- _Tools_ > _Options_ > _Projects and Solutions_ > _Web Package Management_ > _External Web Tools_:
```
.\node_modules\.bin
$(PATH)
...
```
and that you have the latest version of _npm_:
```Shell
npm install npm@latest -g
```

From the command line or _Package Manager Console_ or [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner), go to the folder that contains _package.json_.
- For development, we use JiT compilation, with source maps & Hot Module Replacement:
```Shell
npm start
```
And from Visual Studio, start debugging.
Make the changes: the browser will update without refreshing.

- For production, we use [AoT compilation](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html), tree shaking & minification:
```Shell
npm run build
```
And from Visual Studio, start debugging using _AngularSPAWebAPI_ profile, that has _Staging_ as environment variable: 
[Working with multiple environments](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments)

#### EF Core commands
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

#### Swagger
- Navigate to `http://localhost:5000/swagger/v1/swagger.json` to see the document generated that describes the endpoints
- Swagger UI can be viewed by navigating to `http://localhost:5000/swagger`

To test the APIs, remove the policy from controllers.

## License
MIT
