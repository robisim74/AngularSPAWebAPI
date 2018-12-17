import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { OAuthService } from 'angular-oauth2-oidc';

import { AuthenticationService } from '../services/authentication.service';

/**
 * Provides signin method to signin & signup components.
 */
export class Signin {

    model: any = {};

    errorMessages: any[] = [];

    constructor(
        protected router: Router,
        protected oAuthService: OAuthService,
        protected authenticationService: AuthenticationService) { }

    signin(): void {
        this.oAuthService
            .fetchTokenUsingPasswordFlowAndLoadUserProfile(this.model.username, this.model.password)
            .then(() => {
                this.authenticationService.init();

                // Strategy for refresh token through a scheduler.
                this.authenticationService.scheduleRefresh();

                // Gets the redirect URL from authentication service.
                // If no redirect has been set, uses the default.
                const redirect: string = this.authenticationService.redirectUrl
                    ? this.authenticationService.redirectUrl
                    : '/home';
                // Redirects the user.
                this.router.navigate([redirect]);
            })
            .catch((errorResponse: HttpErrorResponse) => {
                // Checks for error in response (error from the Token endpoint).
                if (errorResponse.error !== '') {
                    switch (errorResponse.error.error) {
                        case 'invalid_grant':
                            this.errorMessages.push({ description: 'Invalid email or password.' });
                            break;
                        default:
                            this.errorMessages.push({ description: 'Unexpected error. Try again.' });
                    }
                } else {
                    this.errorMessages.push({ description: 'Server error. Try later.' });
                }
            });
    }

    clearMessages(): void {
        this.errorMessages = [];
    }

}
