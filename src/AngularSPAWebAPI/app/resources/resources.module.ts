import { NgModule } from '@angular/core';

import { ResourcesRoutingModule } from './resources-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ResourcesComponent } from './resources.component';

@NgModule({
    imports: [
        ResourcesRoutingModule,
        SharedModule
    ],
    declarations: [
        ResourcesComponent
    ],
    exports: [
    ],
    providers: [
    ]
})
export class ResourcesModule { }
