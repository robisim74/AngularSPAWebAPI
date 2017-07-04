import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { IdentityService } from './services/identity.service';

import { AppComponent } from './app.component';

// angular2-jwt config for JiT and AoT compilation.
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// Set tokenGetter to use the same storage in AuthenticationService.Helpers.
export function getAuthHttp(http: Http) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        tokenGetter: (() => localStorage.getItem("id_token"))
    }), http);
}

@NgModule({
    // Core Modules here.
    // - Lazy-Loaded Modules must be declared within root app.routing module with 'loadChildren:' notation and not here.
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    declarations: [
        AppComponent
    ],
    exports: [
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        IdentityService,
        {
            provide: AuthHttp,
            useFactory: getAuthHttp,
            deps: [Http]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
