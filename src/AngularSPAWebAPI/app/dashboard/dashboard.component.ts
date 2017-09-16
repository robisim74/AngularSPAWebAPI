import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from '../services/translate/translate.service';

import { IdentityService } from '../services/identity.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    refreshTranslate: Observable<boolean>;

    displayedColumns = ['email', 'givenName', 'familyName', 'actions'];
    dataSource: UsersDataSource;

    constructor(
        private identityService: IdentityService,
        private translationService: TranslateService) { }

    ngOnInit() {
        // translation service observable
        this.refreshTranslate = this.translationService.getRefreshTranslateObservable();

        this.identityService.getAll();
        this.dataSource = new UsersDataSource(this.identityService);
    }

    delete(username: string) {
        this.identityService.delete(username);
    }

}

/**
 * Data source to provide data rendered in the table.
 */
export class UsersDataSource extends DataSource<any> {
    constructor(private identityService: IdentityService) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     */
    connect(): Observable<any[]> {
        return this.identityService.users;
    }

    disconnect() {
        //
    }
}
