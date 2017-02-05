// AoT compilation entry point.

// Polyfills (no need reflect-metadata).
import 'core-js/client/shim';
import 'zone.js/dist/zone';

import 'hammerjs';

// Angular Material theme.
import './styles/blue-amber.scss';
// App styles.
import './styles/app.scss';

import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
