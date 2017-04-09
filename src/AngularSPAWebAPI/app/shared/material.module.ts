import { NgModule } from '@angular/core';
import {
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule
} from '@angular/material';

const materialModules: any[] = [
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})

export class MaterialModule { }
