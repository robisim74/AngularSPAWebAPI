using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using AngularSPAWebAPI.Data;
using AngularSPAWebAPI.Models;
using AngularSPAWebAPI.Services;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AngularSPAWebAPI
{
    public class Startup
    {
        private Process npmProcess;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
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

            // Role based Authorization: policy based role checks.
            services.AddAuthorization(options =>
            {
                // Policy for dashboard: only administrator role.
                options.AddPolicy("Manage Accounts", policy => policy.RequireRole("administrator"));
                // Policy for resources: user or administrator roles. 
                options.AddPolicy("Access Resources", policy => policy.RequireRole("administrator", "user"));
            });

            // Adds application services.
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IDbInitializer, DbInitializer>();

            // Adds IdentityServer.
            services.AddIdentityServer()
                // The AddDeveloperSigningCredential extension creates temporary key material for signing tokens.
                // This might be useful to get started, but needs to be replaced by some persistent key material for production scenarios.
                // See the http://docs.identityserver.io/en/release/topics/crypto.html#refcrypto for more information.
                .AddDeveloperSigningCredential()
                .AddInMemoryPersistedGrants()
                // To configure IdentityServer to use EntityFramework (EF) as the storage mechanism for configuration data (rather than using the in-memory implementations),
                // see https://identityserver4.readthedocs.io/en/release/quickstarts/8_entity_framework.html
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<ApplicationUser>(); // IdentityServer4.AspNetIdentity.

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "http://localhost:5000/";
                    //options.Authority = "http://angularspawebapi.azurewebsites.net/";
                    options.RequireHttpsMetadata = false;

                    options.ApiName = "WebAPI";
                });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Starts "npm start" command.
                try
                {
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                    {
                        npmProcess = new Process
                        {
                            StartInfo = new ProcessStartInfo("cmd.exe", "/C npm start") { UseShellExecute = false }
                        };
                    }
                    else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        //
                    }
                    else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
                    {
                        //
                    }
                    npmProcess.Start();
                    
                    // Registers the application shutdown event.
                    var applicationLifetime = app.ApplicationServices.GetRequiredService<IApplicationLifetime>();
                    applicationLifetime.ApplicationStopping.Register(OnShutDown);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }

            // Router on the server must match the router on the client (see app.routing.module.ts) to use PathLocationStrategy.
            var appRoutes = new[] {
                 "/home",
                 "/account/signin",
                 "/account/signup",
                 "/resources",
                 "/dashboard"
            };

            app.Use(async (context, next) =>
            {
                if (context.Request.Path.HasValue && appRoutes.Contains(context.Request.Path.Value))
                {
                    context.Request.Path = new PathString("/");
                }

                await next();
            });

            app.UseIdentityServer();

            app.UseMvc();

            // Microsoft.AspNetCore.StaticFiles: API for starting the application from wwwroot.
            // Uses default files as index.html.
            app.UseDefaultFiles();
            // Uses static file for the current path.
            app.UseStaticFiles();
        }

        private void OnShutDown()
        {
            if (npmProcess != null)
            {
                try
                {
                    Console.WriteLine($"Killing process npm process ( {npmProcess.StartInfo.FileName} {npmProcess.StartInfo.Arguments} )");
                    npmProcess.Kill();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Unable to kill npm process ( {npmProcess.StartInfo.FileName} {npmProcess.StartInfo.Arguments} )");
                    Console.WriteLine($"Exception: {ex}");
                }
            }
        }
    }
}
