import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, tokenNotExpired } from './services/authentication.service';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    constructor(public authenticationService: AuthenticationService, private router: Router) {

        // Optional strategy for refresh token through a scheduler.
        this.authenticationService.startupTokenRefresh();

    }

    // Checks if user is signed in (token in not expired).
    get signedIn(): boolean {

        return tokenNotExpired();

    }

    // The user's name.
    get name(): string {

        let user: any = this.authenticationService.getUser();
        return (typeof user.given_name !== 'undefined') ? user.given_name : "";

    }

    // Checks for administrator user.
    get isAdmin(): boolean {

        let user: any = this.authenticationService.getUser();

        if (typeof user.role !== 'undefined') {

            let roles: string[] = user.role;
            return roles.indexOf("administrator") != -1;

        }

        return false;

    }

    signout(): void {

        this.authenticationService.signout();

        this.router.navigate(['/home']);

    }

}
