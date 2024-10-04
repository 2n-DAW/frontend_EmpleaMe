import { Routes } from '@angular/router';

const profileRoutes: Routes = [
    {
        path: ':username',
        loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    },
    {
        path: 'categories/:slug',
        loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    },
    {
        path: ':filters',
        loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    },
];

export default profileRoutes;
