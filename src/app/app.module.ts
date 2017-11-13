import { NgModule } from '@angular/core';
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
        AuthGuard,
        AuthenticationService,
        IdentityService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
