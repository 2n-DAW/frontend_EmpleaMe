import { Routes } from '@angular/router';

const shopRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shop.component').then(c => c.ShopComponent),
  },
  {
    path: 'categories/:slug',
    loadComponent: () => import('./shop.component').then(c => c.ShopComponent),
  },
  {
    path: ':filters',
    loadComponent: () => import('./shop.component').then(c => c.ShopComponent),
  },
];

export default shopRoutes;
