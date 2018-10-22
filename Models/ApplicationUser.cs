using Microsoft.AspNetCore.Identity;

namespace AngularSPAWebAPI.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public virtual string GivenName { get; set; }
        public virtual string FamilyName { get; set; }
    }
}
