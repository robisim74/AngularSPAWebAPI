import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

/**
 * Provides signin method to signin & signup components.
 */
@Injectable()
export class SigninService {

    model: any = {};

    errorMessages: any[] = [];

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService) {

        }

    signin(): void {
        this.authenticationService.signin(this.model.username, this.model.password)
            .subscribe(
            () => {
                // Optional strategy for refresh token through a scheduler.
                this.authenticationService.scheduleRefresh();

                // Gets the redirect URL from authentication service.
                // If no redirect has been set, uses the default.
                const redirect: string = this.authenticationService.redirectUrl
                    ? this.authenticationService.redirectUrl
                    : '/home';

                // Redirects the user.
                this.router.navigate([redirect]);
            },
            (error: any) => {
                // Checks for error in response (error from the Token endpoint).
                if (error.body != "") {
                    const body: any = error.json();

                    switch (body.error) {
                        case "invalid_grant":
                            this.errorMessages.push({ description: "Invalid email or password." });
                            break;
                        default:
                            this.errorMessages.push({ description: "Unexpected error. Try again." });
                    }
                } else {
                    const errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : "Server error";
                    console.log(errMsg);
                    this.errorMessages.push({ description: "Server error. Try later." });
                }
            });
    }

    clearMessages(): void {
        this.errorMessages = [];
    }

}
