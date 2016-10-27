using IdentityServer4.Models;
using System.Collections.Generic;

namespace Angular2SPAWebAPI
{
    public class Config
    {
        // Scopes define the resources in the system.
        public static IEnumerable<Scope> GetScopes()
        {
            return new List<Scope>
            {
                new Scope
                {
                    Name = "WebAPI",
                    Description = "Web API for the Angular 2 SPA",

                    // Defines which user claims will be included in the identity token
                    // when this scope gets requested.
                    Claims = new List<ScopeClaim>
                    {
                        new ScopeClaim("given_name"),
                        new ScopeClaim("family_name"),
                        new ScopeClaim("role")
                    }
                },
                StandardScopes.OfflineAccess // For refresh tokens.
            };
        }

        // Clients want to access resources.
        public static IEnumerable<Client> GetClients()
        {
            // Clients credentials.
            return new List<Client>
            {
                // http://docs.identityserver.io/en/dev/reference/client.html.
                new Client
                {
                    ClientId = "Angular2SPA",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
                    AllowAccessTokensViaBrowser = true,
                    RequireClientSecret = false, // This client does not need a secret to request tokens from the token endpoint.
                    AccessTokenLifetime = 900, // Lifetime of access token in seconds.

                    AllowedScopes = new List<string>
                    {
                        "WebAPI",
                        StandardScopes.OfflineAccess.Name // "offline_access" for refresh tokens.
                    }
                }
            };
        }
    }
}
