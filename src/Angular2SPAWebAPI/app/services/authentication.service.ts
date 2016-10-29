import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { Config } from '../config';

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

    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {

        // On bootstrap or refresh, tries to get the user's data.
        this.decodeToken();

        // Creates header for post requests.
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: this.headers });

    }

    /**
     * Tries to sign in the user.
     *
     * @param username
     * @param password
     * @return The user's data
     */
    public signin(username: string, password: string): Observable<any> {

        // Token endpoint & params.
        let tokenEndpoint: string = Config.TOKEN_ENDPOINT;

        let params: any = {
            client_id: Config.CLIENT_ID,
            grant_type: Config.GRANT_TYPE,
            username: username,
            password: password,
            scope: Config.SCOPE
        };

        // Encodes the parameters.
        let body: string = this.encodeParams(params);

        return this.http.post(tokenEndpoint, body, this.options)
            .map((res: Response) => {

                let body: any = res.json();

                // Sign in successful if there's an access token in the response.
                if (typeof body.access_token !== 'undefined') {

                    // Stores access token & refresh token.
                    this.store(body);

                }

            }).catch((error: any) => {

                // Error on post request.
                return Observable.throw(error);

            });

    }

    /**
     * Tries to get a new token using refresh token.
     */
    public getNewToken(): void {

        let refreshToken: string = localStorage.getItem('refresh_token');

        if (refreshToken != null) {

            // Token endpoint & params.
            let tokenEndpoint: string = Config.TOKEN_ENDPOINT;

            let params: any = {
                client_id: Config.CLIENT_ID,
                grant_type: "refresh_token",
                refresh_token: refreshToken
            };

            // Encodes the parameters.
            let body: string = this.encodeParams(params);

            this.http.post(tokenEndpoint, body, this.options)
                .subscribe(
                (res: Response) => {

                    let body: any = res.json();

                    // Successful if there's an access token in the response.
                    if (typeof body.access_token !== 'undefined') {

                        // Stores access token & refresh token.
                        this.store(body);

                    }

                });

        }

    }

    /**
     * Revokes token.
     */
    public revokeToken(): void {

        let token: string = localStorage.getItem('id_token');

        if (token != null) {

            // Revocation endpoint & params.
            let revocationEndpoint: string = Config.REVOCATION_ENDPOINT;

            let params: any = {
                client_id: Config.CLIENT_ID,
                token_type_hint: "access_token",
                token: token
            };

            // Encodes the parameters.
            let body: string = this.encodeParams(params);

            this.http.post(revocationEndpoint, body, this.options)
                .subscribe(
                () => {

                    localStorage.removeItem('id_token');

                });

        }

    }

    /**
     * Revokes refresh token.
     */
    public revokeRefreshToken(): void {

        let refreshToken: string = localStorage.getItem('refresh_token');

        if (refreshToken != null) {

            // Revocation endpoint & params.
            let revocationEndpoint: string = Config.REVOCATION_ENDPOINT;

            let params: any = {
                client_id: Config.CLIENT_ID,
                token_type_hint: "refresh_token",
                token: refreshToken
            };

            // Encodes the parameters.
            let body: string = this.encodeParams(params);

            this.http.post(revocationEndpoint, body, this.options)
                .subscribe(
                () => {

                    localStorage.removeItem('refresh_token');

                });

        }

    }

    /**
     * Removes user and revokes tokens.
     */
    public signout(): void {

        this.redirectUrl = null;

        this.user = {};

        // Revokes token.
        this.revokeToken();

        // Revokes refresh token.
        this.revokeRefreshToken();

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

    /**
     * // Encodes the parameters.
     *
     * @param params The parameters to be encoded
     * @return The encoded parameters
     */
    private encodeParams(params: any): string {

        let body: string = "";
        for (let key in params) {
            if (body.length) {
                body += "&";
            }
            body += key + "=";
            body += encodeURIComponent(params[key]);
        }

        return body;
    }

    /**
     * Stores access token & refresh token.
     *
     * @param body The response of the request to the token endpoint
     */
    private store(body: any): void {

        // Stores access token in local storage to keep user signed in.
        localStorage.setItem('id_token', body.access_token);
        // Stores refresh token in local storage.
        localStorage.setItem('refresh_token', body.refresh_token);

        // Decodes the token.
        this.decodeToken();

    }

}
