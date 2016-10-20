using Angular2SPAWebAPI.Data;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Linq;

namespace Angular2SPAWebAPI.Models
{
    public static class DbInitializer
    {
        public static async void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // Looks for any users.
            if (context.Users.Any())
            {
                return; // DB has been seeded.
            }

            // Seeds an administrator user.
            var user = new ApplicationUser
            {
                GivenName = "Admin",
                FamilyName = "Admin",
                AccessFailedCount = 0,
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                Email = "admin@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = "ADMIN@GMAIL.COM",
                NormalizedUserName = "ADMIN@GMAIL.COM",
                SecurityStamp = Guid.NewGuid().ToString(),
                TwoFactorEnabled = false,
                UserName = "admin@gmail.com"
            };

            // Password.
            var password = new PasswordHasher<ApplicationUser>();
            var passawordHashed = password.HashPassword(user, "Admin01*");

            user.PasswordHash = passawordHashed;

            // Claims.
            var claims = new IdentityUserClaim<string>[] {
                new IdentityUserClaim<string> { ClaimType = JwtClaimTypes.GivenName, ClaimValue = user.GivenName },
                new IdentityUserClaim<string> { ClaimType = JwtClaimTypes.FamilyName, ClaimValue = user.FamilyName },
                new IdentityUserClaim<string> { ClaimType = JwtClaimTypes.Role, ClaimValue = "administrator" }
            };
            foreach (var claim in claims)
            {
                user.Claims.Add(claim);
            }

            var userStore = new UserStore<ApplicationUser>(context);
            await userStore.CreateAsync(user);

            await context.SaveChangesAsync();
        }
    }
}
