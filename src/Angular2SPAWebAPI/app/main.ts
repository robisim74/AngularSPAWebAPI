// JiT compilation entry point.

// Polyfills.
import 'core-js/client/shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'hammerjs';

// Angular 2 Material theme.
import './styles/blue-amber.scss';
// App styles.
import './styles/app.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
