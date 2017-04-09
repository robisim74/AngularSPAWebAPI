import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { IdentityService } from './services/identity.service';

import { HomeComponent } from './home.component';
import { ResourcesComponent } from './resources.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './account/signin.component';
import { SignupComponent } from './account/signup.component';

import { MaterialModule } from './shared/material.module';

// angular2-jwt config for JiT and AoT compilation.
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

// Set tokenGetter to use the same storage in AuthenticationService.Helpers.
export function getAuthHttp(http: Http) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        tokenGetter: (() => localStorage.getItem('id_token'))
    }), http);
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        routing,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ResourcesComponent,
        DashboardComponent,
        SigninComponent,
        SignupComponent
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
