import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../shared/material.module';

import { SigninComponent } from './signin/signin.component';

import { SignupComponent } from './signup/signup.component';

import { SigninService } from './signin.service';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    SigninService,
  ]
})
export class AccountModule { }
