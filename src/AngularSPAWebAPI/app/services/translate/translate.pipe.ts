import { Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from './translate.service'; // our translate service
@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'translate'
})

export class TranslatePipe implements PipeTransform {

    constructor(private translate: TranslateService) {}

    transform(value: string, args: string | string[]): any {

        if (!value) {
            return;
        }

        // remove first element from args (when refresh observable is included as in array args)
        if (args && Array.isArray(args) && args.length > 1) {
            args = args.slice(1);
        }

        return this.translate.instant(value, args);
    }
}
