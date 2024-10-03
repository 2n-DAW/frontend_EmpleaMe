import { Routes } from '@angular/router';

const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
  },
];

export default authRoutes;
