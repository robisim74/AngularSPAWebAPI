import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthHttp } from 'angular2-jwt';

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable() export class IdentityService {

    headers: Headers;
    options: RequestOptions;

    constructor(private authHttp: AuthHttp, private http: Http) {

        // Creates header for post requests.
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });

    }

    /**
     * Gets all users through AuthHttp.
     */
    public GetAll(): Observable<any> {

        // Sends an authenticated request.
        return this.authHttp.get("/api/identity/GetAll")
            .map((res: Response) => {

                return res.json();

            })
            .catch((error: any) => {

                // Error on get request.
                return Observable.throw(error);

            });

    }

    /**
     * Creates a new user.
     *
     * @param model User's data
     * @return An IdentityResult
     */
    public Create(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post("/api/identity/Create", body, this.options)
            .map((res: Response) => {

                return res.json();

            })
            .catch((error: any) => {

                // Error on post request.
                return Observable.throw(error);

            });

    }

    /**
     * Deletes a user through AuthHttp.
     * 
     * @param username Username of the user
     * @return An IdentityResult
     */
    public Delete(username: string): Observable<any> {

        let body: string = JSON.stringify(username);

        // Sends an authenticated request.
        return this.authHttp.post("/api/identity/Delete", body, this.options)
            .map((res: Response) => {

                return res.json();

            })
            .catch((error: any) => {

                // Error on post request.
                return Observable.throw(error);

            });

    }

    // Add other methods.

}
