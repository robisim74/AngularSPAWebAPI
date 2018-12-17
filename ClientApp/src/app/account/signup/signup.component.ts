import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';

import { AuthenticationService } from '../../services/authentication.service';
import { IdentityService } from '../../services/identity.service';
import { Signin } from '../signin';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent extends Signin {

    constructor(
        protected router: Router,
        protected oAuthService: OAuthService,
        protected authenticationService: AuthenticationService,
        private identityService: IdentityService) {
        super(router, oAuthService, authenticationService);
    }

    signup(): void {
        this.identityService.create(this.model)
            .subscribe(
                (res: any) => {
                    // IdentityResult.
                    if (res.succeeded) {
                        // Signs in the user.
                        this.signin();
                    } else {
                        this.errorMessages = res.errors;
                    }
                },
                (error: any) => {
                    this.errorMessages.push({ description: 'Server error. Try later.' });
                });
    }

}
