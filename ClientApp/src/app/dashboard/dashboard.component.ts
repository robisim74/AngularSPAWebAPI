import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

import { IdentityService } from '../services/identity.service';

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

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    displayedColumns = ['email', 'givenName', 'familyName', 'actions'];
    dataSource: UsersDataSource;

    constructor(private identityService: IdentityService) { }

    ngOnInit() {
        this.identityService.getAll();
        this.dataSource = new UsersDataSource(this.identityService);
    }

    delete(username: string) {
        this.identityService.delete(username);
    }

}
