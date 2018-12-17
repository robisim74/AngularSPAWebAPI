import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable() export class IdentityService {

    public users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    /**
     * Gets all users.
     */
    public getAll(): void {
        // Sends an authenticated request.
        this.http
            .get('/api/identity/GetAll', {
                headers: this.authenticationService.getAuthorizationHeader()
            })
            .subscribe(
                (data: any) => {
                    this.users.next(data);
                },
                (error: HttpErrorResponse) => {
                    if (error.error instanceof ErrorEvent) {
                        console.log('An error occurred:', error.error.message);
                    } else {
                        console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                    }
                });
    }

    /**
     * Creates a new user.
     * @param model User's data
     * @return An IdentityResult
     */
    public create(model: any): Observable<any> {
        const body: string = JSON.stringify(model);

        // Sends an authenticated request.
        return this.http.post('/api/identity/Create', body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).pipe(
            map((response: Response) => {
                return response;
            }),
            catchError((error: any) => {
                return throwError(error);
            }));
    }

    /**
     * Deletes a user.
     * @param username Username of the user
     * @return An IdentityResult
     */
    public delete(username: string): void {
        const body: string = JSON.stringify(username);

        // Sends an authenticated request.
        this.http
            .post('/api/identity/Delete', body, {
                headers: this.authenticationService.getAuthorizationHeader()
            })
            .subscribe(
                () => {
                    // Refreshes the users.
                    this.getAll();
                },
                (error: HttpErrorResponse) => {
                    if (error.error instanceof ErrorEvent) {
                        console.log('An error occurred:', error.error.message);
                    } else {
                        console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
                    }
                });
    }

    // Add other methods.

}
