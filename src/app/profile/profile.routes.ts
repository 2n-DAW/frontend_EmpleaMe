import { Routes } from '@angular/router';
import { ProfileResolver } from '../core/services/profile-resolver.service';

const profileRoutes: Routes = [
  {
    path: ':username',
    loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    resolve: { profile: ProfileResolver },
    children: [
      {
        path: '',
        loadComponent: () => import('./ui/profile-jobs/profile-jobs.component').then(c => c.ProfileJobsComponent),

      },
      {
        path: 'favorites',
        loadComponent: () => import('./ui/profile-likes/profile-likes.component').then(c => c.ProfileLikesComponent),
      },
      {
        path: '',
        outlet: 'users',
        loadComponent: () => import('./ui/profile-followers/profile-followers.component').then(c => c.ProfileFollowersComponent),
      }
    ]
  },


];

export default profileRoutes;
