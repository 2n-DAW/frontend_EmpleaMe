import { Routes } from '@angular/router';
import { ProfileResolver } from '../core/services/profile-resolver.service';

const profileRoutes: Routes = [
  {
    path: ':username',
    loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    resolve: { profile: ProfileResolver },
    // children: [
    //   {
    //     path: '',
    //     loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    //   }
    //   {
    //     path: 'favorites',
    //     component: ProfileFavoritesComponent
    //   }
    // ]
  },
  // {
  //   path: '',
  //   loadComponent: () => import('./profile-jobs.component').then(c => c.ProfileJobsComponent),
  // },
  // {
  //   path: 'favorites',
  //   loadComponent: () => import('./profile-favorites.component').then(c => c.ProfileFavoritesComponent),
  // },
];

export default profileRoutes;
