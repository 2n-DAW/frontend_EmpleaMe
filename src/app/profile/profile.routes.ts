import { Routes } from '@angular/router';
import { ProfileResolver } from '../core/services';

const profileRoutes: Routes = [
    {
        path: ':username',
        loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
        resolve: { profile: ProfileResolver }
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
