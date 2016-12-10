
/**
 * Configuration data for the app, as in Config.cs.
 */
export class Config {

    /**
     * Token endpoint.
     * @see https://identityserver4.readthedocs.io/en/dev/endpoints/token.html
     */
    public static readonly TOKEN_ENDPOINT: string = "/connect/token";

    /**
     * Revocation endpoint.
     */
    public static readonly REVOCATION_ENDPOINT: string = "/connect/revocation";

    /**
     * UserInfo endpoint.
     * @see https://identityserver4.readthedocs.io/en/dev/endpoints/userinfo.html
     */
    public static readonly USERINFO_ENDPOINT: string = "/connect/userinfo";

    /**
     * The ClientId.
     */
    public static readonly CLIENT_ID: string = "Angular2SPA";

    /**
     * Resource Owner Password Credential grant.
     */
    public static readonly GRANT_TYPE: string = "password";

    /**
     * The Web API, refresh token (offline_access) & user info (openid profile roles).
     */
    public static readonly SCOPE: string = "WebAPI offline_access openid profile roles";

}
