import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Importa HttpClient para utilizarlo en service
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importa el módulo Core

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    CoreModule,
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()  // Agrega HttpClient como proveedor
  ]
};
