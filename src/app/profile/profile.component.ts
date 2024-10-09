import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { concatMap ,  tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { User, Profile } from '../core/models';
import { UserService } from '../core/services/user.service';
import { SharedModule } from '../shared';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;

  ngOnInit() {
    // this.route.data.pipe(
    //   concatMap((data: { profile: Profile }) => {
    //     console.log(data);
    //     this.profile = data.profile;
    //     // Load the current user's data.
    //     return this.userService.currentUser.pipe(tap(
    //       (userData: User) => {
    //         this.currentUser = userData;
    //         this.isUser = (this.currentUser.username === this.profile.username);
    //       }
    //     ));
    //   })
    // ).subscribe((() => {
    //   this.cd.markForCheck();
    // }));


    this.route.data.pipe(
      concatMap((data: any) => {
        console.log(data);
        this.profile = data.profile;
        // Load the current user's data.
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