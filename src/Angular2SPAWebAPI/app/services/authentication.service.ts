import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

/**
 * ROPC Authentication service.
 */
@Injectable() export class AuthenticationService {

    /**
     * Stores the URL so we can redirect after signing in.
     */
    public redirectUrl: string;

    /**
     * User's data.
     */
    private user: any = {};

    constructor(private http: Http) {

        // On bootstrap or refresh gets the user's data.
        this.decodeToken();

    }

    /**
     * Tries to sign in the user.
     *
     * @param tokenEndpoint The endpoint to request the acces token
     * @param data The data requested by endpoint for authentication
     * @return The user's data
     */
    public signin(tokenEndpoint: string, data: any): Observable<any> {

        // Encodes the data for the body.
        let body: string = "";
        for (let key in data) {
            if (body.length) {
                body += "&";
            }
            body += key + "=";
            body += encodeURIComponent(data[key]);
        }

        // Creates header.
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options: RequestOptions = new RequestOptions({ headers: headers });

        return this.http.post(tokenEndpoint, body, options)
            .map((res: Response) => {

                let body: any = res.json();

                // Sign in successful if there's an access token in the response.
                if (body != null && typeof body.access_token !== 'undefined') {

                    // Stores access token in local storage to keep user signed in.
                    localStorage.setItem('id_token', body.access_token);

                    // Decodes the token.
                    this.decodeToken();

                }

            }).catch((error: any) => {

                // Error on post request.
                return Observable.throw(error);

            });

    }

    /**
     * Removes user and token from storage to sign user out.
     */
    public signout(): void {

        this.redirectUrl = null;

        this.user = {};

        localStorage.removeItem('id_token');

    }

    /**
     * Gets user's data.
     *
     * @return The user's data
     */
    public getUser(): any {

        return this.user;

    }

    /**
     * Decodes token through JwtHelper.
     */
    private decodeToken(): void {

        if (tokenNotExpired()) {

            let token: string = localStorage.getItem('id_token');

            let jwtHelper: JwtHelper = new JwtHelper();
            this.user = jwtHelper.decodeToken(token);

        }

    }

}
