import { OpaqueToken } from '@angular/core';

import { LANG_EN_TRANS } from './lang-en';

import { LANG_ES_TRANS } from './lang-es';

import { LANG_IT_TRANS } from './lang-it';

// translation token
export const TRANSLATIONS = new OpaqueToken('Translations');

// all traslations
export const dictionary = {
    en: LANG_EN_TRANS,
    es: LANG_ES_TRANS,
    it: LANG_IT_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary }
];
