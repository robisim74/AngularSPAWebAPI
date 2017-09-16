import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TranslateService } from '../../services/translate/translate.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Signin } from '../signin';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent extends Signin implements OnInit {

    refreshTranslate: Observable<boolean>;

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService,
        private translationService: TranslateService) {
        super(router, authenticationService);

        // Preloads data for live example.
        this.model.username = "admin@gmail.com";
        this.model.password = "Admin01*";
    }

    ngOnInit() {
        // translation service observable
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();
    }

}
