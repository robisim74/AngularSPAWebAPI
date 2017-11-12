import { NgModule } from '@angular/core';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const materialModules: any[] = [
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CdkTableModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})

export class MaterialModule { }
