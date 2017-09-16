import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TranslateService } from '../../services/translate/translate.service';
import { AuthenticationService } from '../../services/authentication.service';
import { IdentityService } from '../../services/identity.service';
import { Signin } from '../signin';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent extends Signin implements OnInit {

    refreshTranslate: Observable<boolean>;

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService,
        private identityService: IdentityService,
        private translationService: TranslateService) {
        super(router, authenticationService);
    }

    ngOnInit() {
        // translation service observable
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();
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
                const errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : "Server error";
                console.log(errMsg);
                this.errorMessages.push({ description: "Server error. Try later." });
            });
    }

}
