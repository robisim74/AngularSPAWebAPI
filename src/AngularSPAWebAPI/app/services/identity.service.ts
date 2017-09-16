import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthHttp } from 'angular2-jwt';

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable() export class IdentityService {

    public users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    private headers: Headers;
    private options: RequestOptions;

    constructor(private authHttp: AuthHttp, private http: Http) {
        // Creates header for post requests.
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    /**
     * Gets all users through AuthHttp.
     */
    public getAll(): void {
        // Sends an authenticated request.
        this.authHttp.get("/api/identity/GetAll")
            .subscribe((value: any) => {
                this.users.next(value.json());
            },
            (error: any) => {
                console.log(error);
            });
    }

    /**
     * Creates a new user.
     * @param model User's data
     * @return An IdentityResult
     */
    public create(model: any): Observable<any> {
        const body: string = JSON.stringify(model);

        return this.http.post("/api/identity/Create", body, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    /**
     * Deletes a user through AuthHttp.
     * @param username Username of the user
     * @return An IdentityResult
     */
    public delete(username: string): void {
        const body: string = JSON.stringify(username);

        // Sends an authenticated request.
        this.authHttp.post("/api/identity/Delete", body, this.options)
            .subscribe(() => {
                // Refreshes the users.
                this.getAll();
            },
            (error: any) => {
                console.log(error);
            });
    }

    // Add other methods.

}
