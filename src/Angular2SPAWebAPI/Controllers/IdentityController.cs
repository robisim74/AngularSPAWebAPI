using Angular2SPAWebAPI.Data;
using Angular2SPAWebAPI.Models;
using Angular2SPAWebAPI.Models.ViewModels;
using Angular2SPAWebAPI.Services;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Angular2SPAWebAPI.Controllers
{
    /// <summary>
    /// Identity Web API controller.
    /// </summary>
    [Route("api/[controller]")]
    [Authorize(Policy = "Manage Accounts")] // Authorization policy for this API.
    public class IdentityController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _context;

        public IdentityController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ILoggerFactory loggerFactory,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<IdentityController>();
            _context = context;
        }

        /// <summary>
        /// Gets all the users (user role).
        /// </summary>
        /// <returns>Returns all the users</returns>
        // GET api/identity/GetAll
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var claim = new Claim("role", "user");
            var users = await _userManager.GetUsersForClaimAsync(claim);

            return new JsonResult(users);
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <returns>IdentityResult</returns>
        // POST: api/identity/Create
        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody]CreateViewModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.username,
                Email = model.username,
                GivenName = model.givenName,
                FamilyName = model.familyName
            };

            // Claims.
            var claims = new IdentityUserClaim<string>[] {
                new IdentityUserClaim<string> { ClaimType = JwtClaimTypes.GivenName, ClaimValue = model.givenName },
                new IdentityUserClaim<string> { ClaimType = JwtClaimTypes.FamilyName, ClaimValue = model.familyName },
                new IdentityUserClaim<string> { ClaimType = JwtClaimTypes.Role, ClaimValue = "user" }
            };
            foreach (var claim in claims)
            {
                user.Claims.Add(claim);
            }

            var result = await _userManager.CreateAsync(user, model.password);

            // Option: enable account confirmation and password reset.

            return new JsonResult(result);
        }

        /// <summary>
        /// Deletes a user.
        /// </summary>
        /// <returns>IdentityResult</returns>
        // POST: api/identity/Delete
        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody]string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            var result = await _userManager.DeleteAsync(user);

            return new JsonResult(result);
        }

        // Add other methods.

    }
}