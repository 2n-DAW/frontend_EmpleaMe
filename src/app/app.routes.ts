import { Routes } from '@angular/router';
import { DetailsResolver } from './core/services';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component')
            .then(c => c.HomeComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component')
            .then(c => c.HomeComponent)
    },
    {
        path: 'shop',
        loadComponent: () => import('./shop/shop.component')
            .then(c => c.ShopComponent)
    },
    {
        path: 'shop/categories/:slug',
        loadComponent: () => import('./shop/shop.component')
            .then(c => c.ShopComponent)
    },

    {
        path: 'details/:slug',
        loadComponent: () => import('./details/details.component').then(c => c.DetailsComponent),
        resolve: { job: DetailsResolver } // 
    },

];