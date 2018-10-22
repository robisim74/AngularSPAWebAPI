import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';

export const oAuthDevelopmentConfig: AuthConfig = {

    clientId: 'AngularSPA',
    scope: 'openid offline_access WebAPI profile roles',
    oidc: false,
    issuer: 'https://localhost:5001',
    requireHttps: true

};

export const oAuthProductionConfig: AuthConfig = {

    clientId: 'AngularSPA',
    scope: 'openid offline_access WebAPI profile roles',
    oidc: false,
    issuer: 'https://angularspawebapi.azurewebsites.net',
    requireHttps: true

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
            url = 'https://angularspawebapi.azurewebsites.net/.well-known/openid-configuration';
        } else {
            // Development & Staging environments.
            this.oAuthService.configure(oAuthDevelopmentConfig);
            url = 'https://localhost:5001/.well-known/openid-configuration';
        }

        // Defines the storage.
        this.oAuthService.setStorage(localStorage);

        // Loads Discovery Document.
        return this.oAuthService.loadDiscoveryDocument(url);
    }

}
