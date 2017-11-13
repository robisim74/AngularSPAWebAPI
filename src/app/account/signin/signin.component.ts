import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';

import { AuthenticationService } from '../../services/authentication.service';
import { Signin } from '../signin';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent extends Signin {

    constructor(
        protected router: Router,
        protected oAuthService: OAuthService,
        protected authenticationService: AuthenticationService) {
        super(router, oAuthService, authenticationService);

        // Preloads data for live example.
        this.model.username = "admin@gmail.com";
        this.model.password = "Admin01*";
    }

}
