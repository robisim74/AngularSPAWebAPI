import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

import { SigninService } from './signin.service';

@NgModule({
    imports: [
        AccountRoutingModule,
        SharedModule
    ],
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    exports: [
    ],
    providers: [
        SigninService,
    ]
})
export class AccountModule { }
