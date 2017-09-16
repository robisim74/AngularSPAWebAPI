import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TranslatePipe } from '../services/translate/translate.pipe';

const sharedModules: any[] = [
    HttpModule,
    CommonModule,
    FormsModule,
    MaterialModule
];

const sharedDirectives: any[] = [
    TranslatePipe // Requires TranslationProviders and TranslateService from root app.module providers section
];

@NgModule({
    imports: sharedModules,
    declarations: sharedDirectives,
    exports: [
        sharedModules,
        sharedDirectives
    ]
})

export class SharedModule { }
