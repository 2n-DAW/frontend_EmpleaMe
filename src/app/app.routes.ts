import { Routes, UrlSegment } from '@angular/router';
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
        path: 'details/:slug',
        loadComponent: () => import('./details/details.component').then(c => c.DetailsComponent),
        resolve: { job: DetailsResolver }
    },
    {
        path: 'shop',
        loadChildren: () => import('./shop/shop.routes'),
    }
    
];