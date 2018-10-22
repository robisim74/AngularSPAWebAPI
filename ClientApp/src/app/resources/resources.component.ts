import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AuthenticationService } from '../services/authentication.service';


@Component({
    selector: 'app-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

    values: any;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // Sends an authenticated request.
        this.http
            .get('/api/values', {
                headers: this.authenticationService.getAuthorizationHeader()
            })
            .subscribe((data: any) => {
                this.values = data;
            },
            (error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                    console.log('An error occurred:', error.error.message);
                } else {
                    console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                }
            });
    }

}
