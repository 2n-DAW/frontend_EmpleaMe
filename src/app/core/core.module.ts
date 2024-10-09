import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpTokenInterceptor } from './interceptor/http-token.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useFactory: () => httpTokenInterceptor,
      // useValue: httpTokenInterceptor,
      multi: true
    }
  ],
})
export class CoreModule { }
