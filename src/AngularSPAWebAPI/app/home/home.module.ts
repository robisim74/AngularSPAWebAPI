import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../shared/material.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    MaterialModule
  ],
  providers: [

  ]
})
export class HomeModule { }
