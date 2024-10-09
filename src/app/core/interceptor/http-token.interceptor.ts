import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService); // Inyecta el servicio directamente en la función

  console.log('Interceptor ejecutado');
  const token = jwtService.getToken();

  if (token) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
    console.log('Solicitud interceptada:', modifiedReq);
    return next(modifiedReq); // Pasa la solicitud modificada
  }

  return next(req); // Si no hay token, pasa la solicitud original
};
