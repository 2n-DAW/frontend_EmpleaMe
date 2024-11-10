import { Routes, UrlSegment } from '@angular/router';
import { DetailsResolver } from './core/services';
import { AuthGuard } from './core/guards/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
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
        path: '',
        loadChildren: () => import('./auth/auth.routes')
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes')
    },
    {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent),
        canActivate: [AuthGuard]
    },
];