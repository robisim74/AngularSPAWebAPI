// JiT compilation entry point.

// Polyfills.
import 'core-js/client/shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'hammerjs';

// Angular Material theme.
import './styles/blue-amber.scss';
// App styles.
import './styles/app.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// Enables Hot Module Replacement.
declare const module: any;
if (module.hot) {
    module.hot.accept();
}

platformBrowserDynamic().bootstrapModule(AppModule);
