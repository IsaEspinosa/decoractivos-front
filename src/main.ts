import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

setInterval(() => {
  const hour = new Date().getHours();
  if (hour > 6 && hour < 19) {
    fetch(`${environment.apiUrl}/status`);
  }
}, 60000);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
