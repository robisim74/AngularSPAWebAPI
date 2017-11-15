# Angular SPA Web API

> **Angular v5** Single Page Application with an ASP.NET Core Web API that uses token authentication. 
> The OAuth 2.0 [Resource Owner Password Credentials grant](https://tools.ietf.org/html/rfc6749#section-4.3) (ROPC) is implemented using IdentityServer4 
> and ASP.NET Core Identity as membership system with a SQLite database.

Get the [Changelog](https://github.com/robisim74/AngularSPAWebAPI/blob/master/CHANGELOG.md).

[Live example](http://angularspawebapi.azurewebsites.net) and its [explanation](https://github.com/robisim74/AngularSPAWebAPI/blob/master/EXPLANATION.md).

> ROPC grant requires the use of SSL.

> For more complex scenarios, where web services are required by more than one application or third-party applications, 
you should use an OpenID Connect implicit flow.

## Features
- Angular v5 & ASP.NET Core 2
- Angular CLI
- AoT compilation in development & production mode
- Angular CLI, .NET Core CLI or Visual Studio 2017
- Angular Material
- Dotnet watch
- Debugging
- Path Location Strategy
- Hot Module Replacement
- IdentityServer4 & ASP.NET Core Identity
- Resource Owner Password Credentials grant
- Refresh token
- Role based Authorization

## Project structure
The structure of the project is based on [Angular CLI ASP.NET Core](https://github.com/robisim74/AngularCliAspNetCore).

**AngularSPAWebAPI**
- **Controllers**
	- **IdentityController.cs** _Identity APIs_
	- **ValuesController.cs** _Resources APIs_
- **Data** _Entity Framework_ migrations
	- **DbInitializer.cs** _Provides method to populate the db_
- **Extensions**
	- **ShellExtensions.cs** _Extension to run npm commands in dev environment_
- **Models**
	- **ApplicationUser.cs** _Profile data for application users_
- **Properties**
	- **lanchSettings.json** _ASP.NET Core environments_
- **src** _Angular application_
- **wwwroot** _Root for Angular application deployment_
- **.angular-cli.json** _Angular CLI configuration_
- **Config.cs** _IdentityServer4 configuration_
- **IdentityDB.sqlite** _SQLite database_
- **package.json** _Packages for Angular app_
- **proxy.config.js** _Proxy configuration for ng serve command: [Proxy To Backend](https://github.com/angular/angular-cli/wiki/stories-proxy)_
- **Startup.cs** _Web API configuration_

## Installing
- Requirements
	- At least [.NET Core 2.0](https://www.microsoft.com/net/download/core)
	- [Node.js and npm](https://docs.npmjs.com/getting-started/installing-node)
    - At least [Angular CLI 1.5.0](https://github.com/angular/angular-cli)
- Edit `ConnectionStrings` in _appsettings.json_

#### Command line & .NET Core CLI
- `npm install`
- Restore & build the solution:
	```Shell
	dotnet restore
	dotnet build
	```
#### Visual Studio 2017
- Make sure your configuration for external tools is correct:
	_Tools_ > _Options_ > _Projects and Solutions_ > _Web Package Management_ > _External Web Tools_
	```
	.\node_modules\.bin
	$(PATH)
	...
	```
- Wait for packages restoring and build the solution
- To run _npm_ commands in Visual Studio you can use [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner) extension

## Running

### Command line & .NET Core CLI

#### Development
- Set _Development_ as environment variable: [Working with multiple environments](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/environments)
- `dotnet watch run`

Make the changes to the Angular app: the browser will update without refreshing.

#### Staging / Production
- `npm run build`
- Set _Staging_ as environment variable
- `dotnet run --no-launch-profile`

### Visual Studio 2017

#### Development
- Select _AngularSPAWebAPI_Dev_ profile
- Start debugging
- Wait for building

Make the changes to the Angular app: the browser will update without refreshing.

#### Staging / Production
- `npm run build`
- Select _AngularSPAWebAPI_Prod_ profile
- Start debugging

## Changing db
To use another database:
- Edit `ConnectionStrings` in _appsettings.json_
- Edit in _Startup.cs_:
```C#
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
```

## EF Core commands

### Command line & .NET Core CLI
```Shell
dotnet ef migrations add [Name] -o Data/Migrations
dotnet ef database update
```

## License
MIT
