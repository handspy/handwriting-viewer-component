import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {HandwritingViewerModule} from './handwriting-viewer/handwriting-viewer.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(HandwritingViewerModule)
  .catch(err => console.error(err));
