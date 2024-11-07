import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Importa HttpClient para utilizarlo en service
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importa el módulo Core

// Importa el idioma español
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
// Registra el idioma español
registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    CoreModule,
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAnimationsAsync(), // Agrega HttpClient como proveedor
    { provide: LOCALE_ID, useValue: 'es' }
  ]
};
