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
    {
        matcher: (url) => {
            if (url.length >= 1 && url[0].path.startsWith('@')) {
                return {
                    consumed: [url[0]],
                    posParams: {
                        username: new UrlSegment(url[0].path.slice(1), {}),
                    },
                };
            }
            return null;
        },
        loadComponent: () => import('./shop/shop.component').then(c => c.ShopComponent),
        loadChildren: () => import('./shop/shop.routes'),
    },
];