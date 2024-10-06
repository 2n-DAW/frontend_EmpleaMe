import { Routes, UrlSegment } from '@angular/router';
import { DetailsResolver } from './core/services';
import { NoAuthGuard } from './core/services';
import { ProfileResolver } from './core/services';

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
        loadChildren: () => import('./shop/shop.routes')
    },
    {
        path: 'details/:slug',
        loadComponent: () => import('./details/details.component').then(c => c.DetailsComponent),
        resolve: { job: DetailsResolver }
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
        //canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
        // canActivate: [NoAuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes'),

    },
];