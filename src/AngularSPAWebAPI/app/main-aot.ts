// AoT compilation entry point.

// Polyfills (no need reflect-metadata).
import 'core-js/client/shim';
import 'zone.js/dist/zone';

import 'web-animations-js';

import 'hammerjs';

// Styles.
import './styles/styles.scss';

import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
