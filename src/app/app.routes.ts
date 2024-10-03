import { Routes, UrlSegment } from '@angular/router';
import { DetailsResolver } from './core/services';
import { HomeAuthResolver } from './core/services/home-auth-resolver.service';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        // resolve: { isAuthenticated: HomeAuthResolver }
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        // resolve: { isAuthenticated: HomeAuthResolver }
    },
    {
        path: 'shop',
        loadChildren: () => import('./shop/shop.routes')
    },
    {
        path: 'details/:slug',
        loadComponent: () => import('./details/details.component').then(c => c.DetailsComponent),
        resolve: { job: DetailsResolver }
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
    },
    // {
    //     path: 'profile',
    //     loadChildren: () => import('./profile/profile.routes')
    // },
];