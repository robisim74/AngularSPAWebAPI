import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { SigninService } from '../signin.service';

@Component({
    templateUrl: 'signin.component.html'
})
export class SigninComponent extends SigninService {

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService) {
        super(router, authenticationService);

        // Preloads data for live example.
        this.model.username = "admin@gmail.com";
        this.model.password = "Admin01*";
    }

}
