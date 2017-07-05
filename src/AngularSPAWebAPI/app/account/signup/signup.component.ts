import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { IdentityService } from '../../services/identity.service';
import { Signin } from '../signin';

@Component({
    templateUrl: 'signup.component.html'
})
export class SignupComponent extends Signin {

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService,
        private identityService: IdentityService) {
        super(router, authenticationService);
    }

    signup(): void {
        this.identityService.Create(this.model)
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
                const errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : "Server error";
                console.log(errMsg);
                this.errorMessages.push({ description: "Server error. Try later." });
            });
    }

}
