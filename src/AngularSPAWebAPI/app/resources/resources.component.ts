import { Component, OnInit } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

@Component({
    templateUrl: './resources.component.html'
})
export class ResourcesComponent implements OnInit {

    values: any;

    constructor(private authHttp: AuthHttp) { }

    ngOnInit() {
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
