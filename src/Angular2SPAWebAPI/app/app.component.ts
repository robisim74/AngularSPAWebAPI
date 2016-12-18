import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './services/authentication.service';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    signedIn: Observable<boolean>;

    name: Observable<string>;

    isAdmin: Observable<boolean>;

    constructor(public authenticationService: AuthenticationService, private router: Router) {

        this.signedIn = this.authenticationService.isSignedIn();

        this.name = this.authenticationService.getUser()
            .map((user: any) => (typeof user.given_name !== 'undefined') ? user.given_name : null);

        this.isAdmin = this.authenticationService.getRoles()
            .map((roles: string[]) => roles.indexOf("administrator") != -1);

        // Optional strategy for refresh token through a scheduler.
        this.authenticationService.startupTokenRefresh();

    }

    signout(): void {

        this.authenticationService.signout();

        this.router.navigate(['/home']);

    }

}
