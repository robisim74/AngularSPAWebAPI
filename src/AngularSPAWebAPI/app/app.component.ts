import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    signedIn: Observable<boolean>;

    name: string;
    isAdmin: boolean;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.signedIn = this.authenticationService.isSignedIn();

        this.authenticationService.userChanged().subscribe(
            (user: User) => {
                this.name = user.givenName;
                this.isAdmin = this.authenticationService.isInRole("administrator");
            });

        // Optional strategy for refresh token through a scheduler.
        this.authenticationService.startupTokenRefresh();
    }

    signout(): void {
        this.authenticationService.signout();

        this.router.navigate(['/home']);
    }

}
