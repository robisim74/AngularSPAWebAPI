import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        DashboardRoutingModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
