import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { OAuthService } from 'angular-oauth2-oidc';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    navItems: any[] = [
        { name: 'Home', route: 'home' },
        { name: 'Resources', route: 'resources' }
    ];

    signedIn: Observable<boolean>;

    name: string;
    isAdmin: boolean;

    constructor(
        public title: Title,
        private oAuthService: OAuthService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        // angular-oauth2-oidc configuration.
        this.oAuthService.clientId = "AngularSPA";
        this.oAuthService.scope = "openid offline_access WebAPI profile roles";
        this.oAuthService.setStorage(this.authenticationService.storage);
        //this.oAuthService.issuer = "http://angularspawebapi.azurewebsites.net";
        this.oAuthService.issuer = "http://localhost:5000";
        this.oAuthService.oidc = false;

        //const url: string = 'http://angularspawebapi.azurewebsites.net/.well-known/openid-configuration';
        const url: string = 'http://localhost:5000/.well-known/openid-configuration';

        // Loads Discovery Document.
        this.oAuthService.loadDiscoveryDocument(url);

        if (this.oAuthService.hasValidAccessToken()) {
            this.authenticationService.init();

            // Strategy for refresh token through a scheduler.
            this.authenticationService.startupTokenRefresh();
        }
    }

    ngOnInit() {
        this.title.setTitle('Angular SPA WebAPI');

        this.signedIn = this.authenticationService.isSignedIn();

        this.authenticationService.userChanged().subscribe(
            (user: User) => {
                this.name = user.givenName;
                this.isAdmin = this.authenticationService.isInRole("administrator");
            });
    }

    signout(): void {
        this.authenticationService.signout();

        this.router.navigate(['/home']);
    }

}
