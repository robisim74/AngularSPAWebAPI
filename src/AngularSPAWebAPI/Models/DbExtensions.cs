using AngularSPAWebAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace AngularSPAWebAPI.Models
{
    public static class DbExtensions
    {
        // Adds the extension method.
        public static async void PopulateDb(this IApplicationBuilder app)
        {
            // Uses app.ApplicationServices to access to the DI container(the IServiceProvider),
            // and gets the instance of the DbService to populate db.
            var dbService = app.ApplicationServices.GetRequiredService<IDbService>();
            await dbService.populate();
        }
    }
}
