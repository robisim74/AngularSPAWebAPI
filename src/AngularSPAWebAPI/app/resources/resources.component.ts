import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from '../services/translate/translate.service';

import { AuthHttp } from 'angular2-jwt';

@Component({
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

    refreshTranslate: Observable<boolean>;

    values: any;

    constructor(
        private authHttp: AuthHttp,
        private translationService: TranslateService) { }

    ngOnInit() {
        // translation service observable
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();

        // Sends an authenticated request.
        this.authHttp.get("/api/values")
            .subscribe(
            (res: any) => {
                this.values = res.json();
            },
            (error: any) => {
                console.log(error);
            });
    }

}
