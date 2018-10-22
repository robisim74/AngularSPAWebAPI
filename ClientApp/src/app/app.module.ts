import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { IdentityService } from './services/identity.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { OAuthConfig } from './oauth.config';

export function initOAuth(oAuthConfig: OAuthConfig): Function {
    return () => oAuthConfig.load();
}

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        OAuthModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    exports: [
    ],
    providers: [
        Title,
        OAuthConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initOAuth,
            deps: [OAuthConfig],
            multi: true
        },
        AuthGuard,
        AuthenticationService,
        IdentityService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
