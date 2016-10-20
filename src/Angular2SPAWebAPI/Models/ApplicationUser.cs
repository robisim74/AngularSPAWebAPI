using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Angular2SPAWebAPI.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        /// <summary>Given name(s) or first name(s) of the End-User.</summary>
        public virtual string GivenName { get; set; }
        /// <summary>Surname(s) or last name(s) of the End-User.</summary>
        public virtual string FamilyName { get; set; }
    }
}
