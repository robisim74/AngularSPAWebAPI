import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';

export const oAuthDevelopmentConfig: AuthConfig = {

    clientId: "AngularSPA",
    scope: "openid offline_access WebAPI profile roles",
    oidc: false,
    issuer: "http://localhost:5000",
    requireHttps: false

};

export const oAuthProductionConfig: AuthConfig = {

    clientId: "AngularSPA",
    scope: "openid offline_access WebAPI profile roles",
    oidc: false,
    issuer: "http://angularspawebapi.azurewebsites.net",
    requireHttps: false

};

/**
 * angular-oauth2-oidc configuration.
 */
@Injectable() export class OAuthConfig {

    constructor(private oAuthService: OAuthService) { }

    load(): Promise<object> {
        let url: string;

        if (environment.production) {
            // Production environment.
            this.oAuthService.configure(oAuthProductionConfig);
            url = 'http://angularspawebapi.azurewebsites.net/.well-known/openid-configuration';
        } else {
            // Development & Staging environments.
            this.oAuthService.configure(oAuthDevelopmentConfig);
            url = 'http://localhost:5000/.well-known/openid-configuration';
        }

        // Defines the storage.
        this.oAuthService.setStorage(localStorage);

        // Loads Discovery Document.
        return this.oAuthService.loadDiscoveryDocument(url);
    }

}
