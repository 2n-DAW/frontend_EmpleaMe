import { Routes } from '@angular/router';
import { ProfileResolver } from '../core/services/profile-resolver.service';
import { ClientGuard } from '../core/guards/client/client-guard.service';
import { CompanyGuard } from '../core/guards/company/company-guard.service';
import { NoRecruiterGuard } from '../core/guards/recruit/no-recruiter-guard.service';

const profileRoutes: Routes = [
  {
    path: ':username',
    loadComponent: () => import('./profile.component').then(c => c.ProfileComponent),
    resolve: { profile: ProfileResolver },
    children: [
      {
        path: '',
        loadComponent: () => import('./ui/profile-comments/profile-comments.component').then(c => c.ProfileCommentsComponent),
      },
      {
        path: 'jobs',
        loadComponent: () => import('./ui/profile-jobs/profile-jobs.component').then(c => c.ProfileJobsComponent),
      },
      {
        path: 'create-job',
        loadComponent: () => import('./ui/profile-create-job/profile-create-job.component').then(c => c.ProfileCreateJobComponent),
        canActivate: [CompanyGuard]
      },
      {
        path: 'pending-inscriptions',
        loadComponent: () => import('./ui/profile-inscriptions/profile-inscriptions.component').then(c => c.ProfileInscriptionsComponent),
      },
      {
        path: 'accepted-inscriptions',
        loadComponent: () => import('./ui/profile-inscriptions/profile-inscriptions.component').then(c => c.ProfileInscriptionsComponent),
      },
      {
        path: 'rejected-inscriptions',
        loadComponent: () => import('./ui/profile-inscriptions/profile-inscriptions.component').then(c => c.ProfileInscriptionsComponent),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./ui/profile-likes/profile-likes.component').then(c => c.ProfileLikesComponent),
        canActivate: [NoRecruiterGuard]
      },
      {
        path: 'followers',
        // outlet: 'users',
        loadComponent: () => import('./ui/profile-followers/profile-followers.component').then(c => c.ProfileFollowersComponent),
      },
      {
        path: 'following',
        // outlet: 'users',
        loadComponent: () => import('./ui/profile-following/profile-following.component').then(c => c.ProfileFollowingComponent),
      },
    ]
  },
];

export default profileRoutes;
