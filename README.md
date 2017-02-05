# Angular SPA Web API

> **Angular 2+** Single Page Application with an ASP.NET Core Web API that uses token authentication. 
> The _Resource Owner Password Credentials grant_ (ROPC) OAuth2 flow is implemented using IdentityServer4, 
> Identity as membership system and claims based authorization with a SQLite database.

Get the [Changelog](https://github.com/robisim74/AngularSPAWebAPI/blob/master/CHANGELOG.md).

[Live example](http://angularspawebapi.azurewebsites.net) and its [explanation](https://github.com/robisim74/AngularSPAWebAPI/blob/master/EXPLANATION.md).

**Links**
- [Talk to a remote server with an HTTP Client](https://angular.io/docs/ts/latest/guide/server-communication.html)
- [angular2-jwt](https://github.com/auth0/angular2-jwt)
- [IdentityServer4](https://identityserver4.readthedocs.io) | [Protecting an API using Passwords](http://docs.identityserver.io/en/dev/quickstarts/2_resource_owner_passwords.html)
- [ASP.NET Core - Security](https://docs.asp.net/en/latest/security/index.html) | [Claims-Based Authorization](https://docs.asp.net/en/latest/security/authorization/claims.html)

For more complex scenarios, where web services are required by more than one application or third-party applications, 
IdentityServer4 offers built-in support for OpenID Connent flows.

**Links**
- [IDENTITYSERVER4, WEB API AND ANGULAR2 IN A SINGLE ASP.NET CORE PROJECT](https://damienbod.com/2016/10/01/identityserver4-webapi-and-angular2-in-a-single-asp-net-core-project/)

The same scenarios are also supported by [AspNet.Security.OpenIdConnect.Server](https://github.com/aspnet-contrib/AspNet.Security.OpenIdConnect.Server) and [openiddict-core](https://github.com/openiddict/openiddict-core).

**Links**
- [Creating your own OpenID Connect server with ASOS](http://kevinchalet.com/2016/07/13/creating-your-own-openid-connect-server-with-asos-introduction/)
- [Bearer Token Authentication in ASP.NET Core](https://blogs.msdn.microsoft.com/webdev/2016/10/27/bearer-token-authentication-in-asp-net-core/)

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
- Check for .NET Core 1.1: **^1.0.0-preview2-1-003177** and the latest Visual Studio Tools: https://www.microsoft.com/net/download/core
- Check for the latest TypeScript for Visual Studio: https://www.typescriptlang.org/#download-links
- Edit `ConnectionStrings` in _appsettings.json_
- Wait for packages restoring and build the solution
- Start debugging

## Editing
#### Changing db
To use another database simply:
- Edit `ConnectionStrings` in _appsettings.json_
- Edit `dependencies` in _project.json_:
```
"Microsoft.EntityFrameworkCore.Sqlite": "1.1.0",
"Microsoft.EntityFrameworkCore.Sqlite.Design": "1.1.0"
```
- Edit in _Startup.cs_:
```
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
```

#### Changing the Angular app
Before running the following commands, make sure your configuration for external tools is correct:
- [Customize external web tools in Visual Studio 2015](https://blogs.msdn.microsoft.com/webdev/2015/03/19/customize-external-web-tools-in-visual-studio-2015/)

and that you have the latest version of _npm_:
```Shell
npm install npm@latest -g
```

From the command line or _Package Manager Console_ or [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner), go to the folder that contains _package.json_.
- For development, we use _JiT compilation_ & source map files, with files watching:
```Shell
npm start
```
And from Visual Studio, start debugging.
Make the changes, and simply refresh the page on the browser.

- For production, we use [AoT compilation](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html), tree shaking & minification:
```Shell
npm run build
```
And from Visual Studio, start debugging.

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

## Advice
- You can change the strategy for refresh token
- You can enable account confirmation and the other Identity services
- Use a SSL certificate: [Insecure passwords](https://developer.mozilla.org/en-US/docs/Web/Security/Insecure_passwords)
- If more than one client app requires the Web API, use an interactive flow: IdentityServer4 or the other libraries allow you to scale your application 

## License
MIT
