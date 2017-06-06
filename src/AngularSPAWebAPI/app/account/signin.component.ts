import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { Signin } from './signin';

@Component({
    templateUrl: 'signin.component.html'
})
export class SigninComponent extends Signin {

    constructor(public router: Router, public authenticationService: AuthenticationService) {
        super(router, authenticationService);

        // Preloads data for live example.
        this.model.username = "admin@gmail.com";
        this.model.password = "Admin01*";
    }

}
