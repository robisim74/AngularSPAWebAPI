import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from './services/translate/translate.service';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    refreshTranslate: Observable<boolean>;
    supportedLanguages: any[];

    navItems: any[] = [
        { name: 'menuHome', route: 'home' },
        { name: 'menuResources', route: 'resources' }
    ];

    signedIn: Observable<boolean>;

    name: string;
    isAdmin: boolean;

    constructor(
        public title: Title,
        private authenticationService: AuthenticationService,
        private router: Router,
        private translationService: TranslateService
    ) { }

    ngOnInit() {
        // Translation service configuration
        // Important note: we will share an Observable object within all the components where we need to use the
        //   translation service in order to trigger the change detection. This allows us to use a pure type Pipe,
        //    which is important. Impure pipes should never be used due to its impact over performance.
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();
        // -- app supported languages
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'Español', value: 'es' },
            { display: 'Italiano', value: 'it' }
        ];
        // -- set default language
        this.translationService.setDefaultLang('en');
        // -- set fallback
        this.translationService.enableFallback(true);
        // -- end Translation service configuration

        this.title.setTitle('Angular SPA WebAPI');

        this.signedIn = this.authenticationService.isSignedIn();

        this.authenticationService.userChanged().subscribe(
            (user: User) => {
                this.name = user.givenName;
                this.isAdmin = this.authenticationService.isInRole("administrator");
            });

        // Strategy for refresh token through a scheduler.
        this.authenticationService.startupTokenRefresh();
    }

    signout(): void {
        this.authenticationService.signout();

        this.router.navigate(['/home']);
    }

    selectLang(lang: string) {
        this.translationService.use(lang);
    }

}
