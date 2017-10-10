namespace AngularSPAWebAPI.Models.AccountViewModels
{
    /// <summary>
    /// Class required to create a new user.
    /// </summary>
    public class CreateViewModel
    {
        public string username { get; set; }
        public string password { get; set; }
        public string givenName { get; set; }
        public string familyName { get; set; }
    }
}
