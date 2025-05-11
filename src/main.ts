import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';


registerLocaleData(localeAr);

bootstrapApplication(AppComponent, {
  providers: [
     provideHttpClient(), 
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'ar' } 
  ]
}).catch(err => console.error(err));