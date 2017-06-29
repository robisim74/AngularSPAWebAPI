import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ResourcesComponent } from './resources.component';

const routes: Routes = [
  { path: '', component: ResourcesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
