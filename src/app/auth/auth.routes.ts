import { Routes } from '@angular/router';
import { NoAuthGuard } from '../core/services';


const shopRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
    canActivate: [NoAuthGuard]
  }

];

export default shopRoutes;
