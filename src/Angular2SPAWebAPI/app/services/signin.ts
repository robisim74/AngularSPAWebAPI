import { Router } from '@angular/router';

import { Config } from '../config';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Provides signin method to signin & signup components.
 */
export class Signin {

    model: any = {};

    errorMessage: string = "";

    constructor(public router: Router, public authenticationService: AuthenticationService) { }

    signin(): void {

        // Token endpoint & data.
        let tokenEndpoint: string = Config.TOKEN_ENDPOINT;

        let data: any = {
            client_id: Config.CLIENT_ID,
            grant_type: Config.GRANT_TYPE,
            username: this.model.username,
            password: this.model.password,
            scope: Config.SCOPE
        };

        this.authenticationService.signin(tokenEndpoint, data)
            .subscribe(
            () => {

                // Gets the redirect URL from authentication service.
                // If no redirect has been set, uses the default.
                let redirect: string = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/home';

                // Redirects the user.
                this.router.navigate([redirect]);

            },
            (error: any) => {

                // Checks for error in response (error from the Token endpoint).
                if (error.body != "") {
                    let body: any = error.json();

                    switch (body.error) {

                        case "invalid_grant":
                            this.errorMessage = "Invalid email or password";
                            break;
                        default:
                            this.errorMessage = "Unexpected error. Try again";

                    }

                } else {

                    // Error on post request.
                    let errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                    console.log(errMsg);

                    this.errorMessage = "Server error. Try later."

                }

            });

    }
}
