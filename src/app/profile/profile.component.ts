import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

import { UserService } from '../core/services';
import { Profile, User } from '../core/models';
import { concatMap, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef,
  ) { }

  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser: boolean = false;

  ngOnInit() {
    this.route.data.pipe(  // obtiene los datos de la ruta que vienen del resolver
      concatMap((data: any) => {
        this.profile = data.profile;
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe((() => {
      this.cd.markForCheck();
    }));
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}
