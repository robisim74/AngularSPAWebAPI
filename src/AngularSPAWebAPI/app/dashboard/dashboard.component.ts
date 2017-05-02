import { Component } from '@angular/core';

import { IdentityService } from '../services/identity.service';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

    users: any;

    constructor(private identityService: IdentityService) {
        this.getAll();
    }

    getAll() {
        this.identityService.GetAll()
            .subscribe(
            (res: any) => {
                this.users = res;
            },
            (error: any) => {
                const errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.log(errMsg);
            });
    }

    delete(username: string) {
        this.identityService.Delete(username)
            .subscribe(
            (res: any) => {
                // IdentityResult.
                if (res.succeeded) {
                    // Refreshes the users.
                    this.getAll();
                } else {
                    console.log(res.errors);
                }

            },
            (error: any) => {
                const errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.log(errMsg);
            });
    }

}
