import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { ProfilesService, UserService } from '../../../core/services';
import { Profile } from '../../../core/models';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-button.component.html',
  styleUrl: './follow-button.component.css'
})
export class FollowButtonComponent {
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  @Input() profile: Profile = {} as Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
    // TODO: remove nested subscribes, use mergeMap

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
          return this.profilesService.follow(this.profile.username)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            ));

          // Otherwise, unfollow this profile
        } else {
          return this.profilesService.unfollow(this.profile.username)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(false);
              },
              err => this.isSubmitting = false
            ));
        }
      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}
