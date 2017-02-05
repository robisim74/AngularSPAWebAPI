using AngularSPAWebAPI.Data;
using AngularSPAWebAPI.Models;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularSPAWebAPI.Services
{
    public class DbService : IDbService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _context;

        public DbService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ILoggerFactory loggerFactory,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = loggerFactory.CreateLogger<DbService>();
            _context = context;
        }

        public async Task populate()
        {
            _context.Database.EnsureCreated();

            if (_context.Users.Any())
            {
                return; // Db has been seeded.
            }

            // Creates Roles.
            await _roleManager.CreateAsync(new IdentityRole("administrator"));
            await _roleManager.CreateAsync(new IdentityRole("user"));

            // Adds Roles to Role Claims.
            var adminRole = await _roleManager.FindByNameAsync("administrator");
            var userRole = await _roleManager.FindByNameAsync("user");
            await _roleManager.AddClaimAsync(adminRole, new Claim(JwtClaimTypes.Role, "administrator"));
            await _roleManager.AddClaimAsync(userRole, new Claim(JwtClaimTypes.Role, "user"));

            // Seeds an admin user.
            var user = new ApplicationUser
            {
                GivenName = "Admin",
                FamilyName = "Admin",
                AccessFailedCount = 0,
                Email = "admin@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = "ADMIN@GMAIL.COM",
                NormalizedUserName = "ADMIN@GMAIL.COM",
                TwoFactorEnabled = false,
                UserName = "admin@gmail.com"
            };

            var result = await _userManager.CreateAsync(user, "Admin01*");

            if (result.Succeeded)
            {
                var adminUser = await _userManager.FindByNameAsync(user.UserName);
                // Assigns the 'administrator' role.
                await _userManager.AddToRoleAsync(adminUser, "administrator");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.GivenName, value: user.GivenName),
                    new Claim(type: JwtClaimTypes.FamilyName, value: user.FamilyName),
                };
                await _userManager.AddClaimsAsync(adminUser, claims);
            }
        }
    }
}
