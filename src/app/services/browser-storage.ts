import { Injectable } from '@angular/core';

/**
 * Set the BrowserStorage to use the same storage in AppModule.
 */
@Injectable() export class BrowserStorage {

    private hasStorage: boolean;

    constructor() {
        this.hasStorage = typeof Storage !== 'undefined';
    }

    public get(key: string): string {
        if (this.hasStorage) {
            return localStorage.getItem(key);
        }

        return null;
    }

    public set(key: string, value: string): void {
        if (this.hasStorage) {
            localStorage.setItem(key, value);
        }
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

}
