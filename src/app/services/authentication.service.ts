import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, catchError, flatMap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';

import { AuthHttp } from 'angular2-jwt';

import { Config } from '../config';
import { User } from '../models/user';
import { BrowserStorage } from './browser-storage';

/**
 * ROPC Authentication service.
 */
@Injectable() export class AuthenticationService {

    /**
     * Stores the URL so we can redirect after signing in.
     */
    public redirectUrl: string;

    /**
     * Behavior subjects of the user's status & data.
     */
    private signinStatus = new BehaviorSubject<boolean>(this.tokenNotExpired());
    private user = new BehaviorSubject<User>(this.getUser());

    /**
     * Token info.
     */
    private expiresIn: number;
    private authTime: number;

    /**
     * Scheduling of the refresh token.
     */
    private refreshSubscription: any;

    /**
     * Offset for the scheduling to avoid the inconsistency of data on the client.
     */
    private offsetSeconds: number = 30;

    private headers: Headers;
    private options: RequestOptions;

    constructor(
        private router: Router,
        private http: Http,
        private authHttp: AuthHttp,
        private browserStorage: BrowserStorage
    ) {
        // Creates header for post requests.
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: this.headers });

        if (!this.tokenNotExpired()) {
            // Removes user's info.
            this.browserStorage.remove("user_info");
            // Revokes tokens.
            this.revokeToken();
            this.revokeRefreshToken();
        }
    }

    public signin(username: string, password: string): Observable<any> {
        const tokenEndpoint: string = Config.TOKEN_ENDPOINT;

        const params: any = {
            client_id: Config.CLIENT_ID,
            grant_type: Config.GRANT_TYPE,
            username: username,
            password: password,
            scope: Config.SCOPE
        };

        const body: string = this.encodeParams(params);

        this.authTime = new Date().valueOf();

        return this.http.post(tokenEndpoint, body, this.options).pipe(
            map((res: Response) => {
                const body: any = res.json();
                if (typeof body.access_token !== "undefined") {
                    // Stores access token & refresh token.
                    this.store(body);
                    // Tells all the subscribers about the new status.
                    this.signinStatus.next(true);
                }
            }),
            catchError((error: any) => {
                return _throw(error);
            })
        );
    }

    /**
     * Strategy for refresh token through a scheduler.
     * Will schedule a refresh at the appropriate time.
     */
    public scheduleRefresh(): void {
        const source = this.authHttp.tokenStream.pipe(
            flatMap(
                (token: string) => {
                    const delay: number = this.expiresIn - this.offsetSeconds * 1000;
                    return interval(delay);
                })
        );

        this.refreshSubscription = source.subscribe(() => {
            this.getNewToken().subscribe(
                () => {
                    // Scheduler works.
                },
                (error: any) => {
                    this.handleRefreshTokenError();
                }
            );
        });
    }

    /**
     * Case when the user comes back to the app after closing it.
     */
    public startupTokenRefresh(): void {
        // If the user is authenticated, uses the token stream
        // provided by angular2-jwt and flatMap the token.
        if (this.tokenNotExpired()) {
            const source = this.authHttp.tokenStream.pipe(
                flatMap(
                    (token: string) => {
                        const now: number = new Date().valueOf();
                        const exp: number = this.getExpiry();
                        const delay: number = exp - now - this.offsetSeconds * 1000;

                        // Uses the delay in a timer to run the refresh at the proper time.
                        return timer(delay);
                    })
            );

            // Once the delay time from above is reached, gets a new JWT and schedules additional refreshes.
            source.subscribe(() => {
                this.getNewToken().subscribe(
                    () => {
                        this.scheduleRefresh();
                    },
                    (error: any) => {
                        this.handleRefreshTokenError();
                    }
                );
            });
        }
    }

    /**
     * Unsubscribes from the scheduling of the refresh token.
     */
    public unscheduleRefresh(): void {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    /**
     * Handles errors on refresh token, like expiration.
     */
    public handleRefreshTokenError(): void {
        this.redirectUrl = this.router.url;

        // Removes user's info.
        this.browserStorage.remove("user_info");

        // Tells all the subscribers about the new status & data.
        this.signinStatus.next(false);
        this.user.next(new User());

        // Unschedules the refresh token.
        this.unscheduleRefresh();

        // Revokes tokens.
        this.revokeToken();
        this.revokeRefreshToken();

        // The user is forced to sign in again.
        this.router.navigate(['/account/signin']);
    }

    /**
     * Tries to get a new token using refresh token.
     */
    public getNewToken(): Observable<any> {
        const refreshToken: string = this.browserStorage.get("refresh_token");

        const tokenEndpoint: string = Config.TOKEN_ENDPOINT;

        const params: any = {
            client_id: Config.CLIENT_ID,
            grant_type: "refresh_token",
            refresh_token: refreshToken
        };

        const body: string = this.encodeParams(params);

        this.authTime = new Date().valueOf();

        return this.http.post(tokenEndpoint, body, this.options).pipe(
            map((res: Response) => {
                const body: any = res.json();
                if (typeof body.access_token !== "undefined") {
                    // Stores access token & refresh token.
                    this.store(body);
                }
            }),
            catchError((error: any) => {
                return _throw(error);
            })
        );
    }

    /**
     * Revokes token.
     */
    public revokeToken(): void {
        this.browserStorage.remove("id_token");
        this.browserStorage.remove("expires");
    }

    public revokeRefreshToken(): void {
        const refreshToken: string = this.browserStorage.get("refresh_token");

        if (refreshToken != null) {
            const revocationEndpoint: string = Config.REVOCATION_ENDPOINT;

            const params: any = {
                client_id: Config.CLIENT_ID,
                token_type_hint: "refresh_token",
                token: refreshToken
            };

            const body: string = this.encodeParams(params);

            this.http.post(revocationEndpoint, body, this.options)
                .subscribe(
                () => {
                    this.browserStorage.remove("refresh_token");
                });
        }
    }

    /**
     * Removes user and revokes tokens.
     */
    public signout(): void {
        this.redirectUrl = null;

        // Removes user's info.
        this.browserStorage.remove("user_info");

        // Tells all the subscribers about the new status & data.
        this.signinStatus.next(false);
        this.user.next(new User());

        // Unschedules the refresh token.
        this.unscheduleRefresh();

        // Revokes tokens.
        this.revokeToken();
        this.revokeRefreshToken();
    }

    /**
     * Calls UserInfo endpoint to retrieve user's data.
     */
    public getUserInfo(): Observable<any> {
        return this.authHttp.get(Config.USERINFO_ENDPOINT).pipe(
            map((res: any) => res.json())
        );
    }

    public changeUser(userInfo: any): void {
        const user: User = new User();

        user.givenName = userInfo.given_name;
        user.familyName = userInfo.family_name;
        user.userName = userInfo.name;
        user.roles = userInfo.role;

        // Stores user info.
        this.storeUser(user);
        // Tells all the subscribers about the new data.
        this.user.next(user);
    }

    /**
     * Checks if user is signed in.
     */
    public isSignedIn(): Observable<boolean> {
        return this.signinStatus.asObservable();
    }

    public userChanged(): Observable<User> {
        return this.user.asObservable();
    }

    /**
     * Checks if user is in the given role.
     */
    public isInRole(role: string): boolean {
        const user: User = this.getUser();
        const roles: string[] = user && typeof user.roles !== "undefined" ? user.roles : [];
        return roles.indexOf(role) != -1;
    }

    /**
     * Checks for presence of token and that token hasn't expired.
     */
    private tokenNotExpired(): boolean {
        const token: string = this.browserStorage.get("id_token");
        return token != null && (this.getExpiry() > new Date().valueOf());
    }

    private encodeParams(params: any): string {
        let body: string = "";
        for (const key in params) {
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
     */
    private store(body: any): void {
        this.browserStorage.set("id_token", body.access_token);
        this.browserStorage.set("refresh_token", body.refresh_token);

        // Calculates token expiration.
        this.expiresIn = body.expires_in as number * 1000; // To milliseconds.
        this.storeExpiry(this.authTime + this.expiresIn);
    }

    /**
     * Returns token expiration in milliseconds.
     */
    private getExpiry(): number {
        return parseInt(this.browserStorage.get("expires"));
    }

    private storeExpiry(exp: number): void {
        this.browserStorage.set("expires", exp.toString());
    }

    private getUser(): User {
        if (this.tokenNotExpired()) {
            return JSON.parse(this.browserStorage.get("user_info"));
        }
        return new User();
    }

    private storeUser(user: User): void {
        this.browserStorage.set("user_info", JSON.stringify(user));
    }

}
