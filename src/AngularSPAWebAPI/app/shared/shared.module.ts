import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

/**
 * Globally Shared Modules, Services, Directives, Pipes ... within all the app
 */
@NgModule({
    // Include also within the 'exports' section
    imports: [
        FormsModule,
        HttpModule
    ],
    // Include also within the 'exports' section
    declarations: [

    ],
    exports: [
        FormsModule,
        HttpModule
    ]
})
export class SharedModule { }
