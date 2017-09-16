import { Injectable, Inject } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { TRANSLATIONS } from './translations'; // import our opaque token

/**
 * Simple Translation Service (adapted version of the original´s one from Jecelyn Yeen)
 * -- more info:
 * https://scotch.io/tutorials/simple-language-translation-in-angular-2-part-1
 * and https://scotch.io/tutorials/simple-language-translation-in-angular-2-part-2
 * -- instant refresh: if we want to use instant refresh option, just pass the 'refreshTranslate' Observer
 * returned from 'getRefreshTranslateObservable()' inside args
 * -- {{ 'text_code_with_two_args' | translate: [refreshTranslate | async, 'hola', 'adios'] }}
 */
@Injectable()
export class TranslateService {

  private currentLang: string;
  private placeholder = '%';
  private defaultLang: string;
  private fallback: boolean;

  // We will use a behaviour subject in order to notify all the subscribers a language refresh
  // -- It will request us to declare an observable attribute inside every component,
  // -- then use getRefreshTranslateObservable() method to initialize it
  // -- As it works into a single shared observable stream in combination
  // -- with a pure-type Pipe it is still more efficient
  private refreshTranslate = new BehaviorSubject<boolean>(false);

  // inject our translations
  constructor( @Inject(TRANSLATIONS) private translations: any) {

  }

  public get getCurrentLang() {
    return this.currentLang || this.defaultLang;
  }

  public setDefaultLang(lang: string) {
    this.defaultLang = lang;
  }

  public enableFallback(enable: boolean) {
    this.fallback = enable;
  }

  public use(lang: string) {
    if (this.currentLang != lang) {
      // set current language
      this.currentLang = lang;
      // notify all the subscribers
      this.refreshTranslate.next(!this.refreshTranslate.getValue());
    }
  }

  // public perform translation
  public instant(key: string, words?: string | string[]) {
    const translation: string = this.translate(key);

    if (!words) {
      return translation;
    }

    return this.replace(translation, words);
  }

  // refresh observable: shared during the whole app lifecycle within a single shared stream
  public getRefreshTranslateObservable(): Observable<boolean> {
    return this.refreshTranslate.asObservable().share();
  }

  private translate(key: string): string {
    const translation = key;

    // found in current language
    if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
      return this.translations[this.currentLang][key];
    }

    // fallback disabled
    if (!this.fallback) {
      return translation;
    }

    // found in default language
    if (this.translations[this.defaultLang] && this.translations[this.defaultLang][key]) {
      return this.translations[this.defaultLang][key];
    }

    // not found
    return translation;
  }

  private replace(word: string = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this.placeholder.concat(i as any), e);
    });

    return translation;
  }

}
