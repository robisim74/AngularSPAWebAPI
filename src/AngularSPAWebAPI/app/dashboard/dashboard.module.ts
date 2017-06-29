import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../shared/material.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    MaterialModule
  ],
  providers: [

  ]
})
export class DashboardModule { }
