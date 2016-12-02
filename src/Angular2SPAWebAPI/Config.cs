using IdentityServer4.Models;
using System.Collections.Generic;

namespace Angular2SPAWebAPI
{
    public class Config
    {
        // Scopes define the resources in the system.
        public static IEnumerable<Scope> GetScopes()
        {
            // Each scope must be in the params when the access token is request. See config.ts in the client app.
            return new List<Scope>
            {
                new Scope
                {
                    Name = "WebAPI",
                    Description = "Web API for the Angular 2 SPA",

                    Type = ScopeType.Resource, // Access token is for APIs.

                    // Defines which user claims will be included in the access token
                    // when this scope gets requested.
                    // We include role claims because we need them to access to the resources.
                    Claims = new List<ScopeClaim>
                    {
                        new ScopeClaim("role")
                    }
                },
                StandardScopes.OfflineAccess, // For refresh token.
                StandardScopes.OpenId, // For UserInfo endpoint: https://identityserver4.readthedocs.io/en/release/endpoints/userinfo.html
                StandardScopes.Profile,
                StandardScopes.Roles
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
                        StandardScopes.OfflineAccess.Name, // "offline_access" for refresh tokens.
                        StandardScopes.OpenId.Name, // "openid" for UserInfo endpoint.
                        StandardScopes.Profile.Name,
                        StandardScopes.Roles.Name
                    }
                }
            };
        }
    }
}
