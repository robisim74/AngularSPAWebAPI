import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';

import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../shared/material.module';

import { ResourcesComponent } from './resources.component';

@NgModule({
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    ResourcesComponent
  ],
  exports: [
    MaterialModule
  ],
  providers: [

  ]
})
export class ResourcesModule { }
