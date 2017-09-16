import { NgModule } from '@angular/core';
import {
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdTableModule,
    MdMenuModule,
    MdTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

const materialModules: any[] = [
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdTableModule,
    MdMenuModule,
    MdTooltipModule,
    CdkTableModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})

export class MaterialModule { }
