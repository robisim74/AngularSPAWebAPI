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
     * The ClientId.
     */
    public static readonly CLIENT_ID: string = "Angular2SPA";

    /**
     * Resource Owner Password Credential grant.
     */
    public static readonly GRANT_TYPE: string = "password";

    /**
     * The Web API.
     */
    public static readonly SCOPE: string = "WebAPI";

}
