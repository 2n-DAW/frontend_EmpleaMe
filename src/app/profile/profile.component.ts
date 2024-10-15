import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { concatMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { User, Profile } from '../core/models';
import { UserService } from '../core/services/user.service';
import { SharedModule } from '../shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;

  private routerSubscription!: Subscription;

  ngOnInit() {
    // Suscribirse a los cambios en las rutas
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });

    // Cargar los datos inicialmente
    this.loadData();
  }

  loadData() {
    this.route.data.pipe(
      concatMap((data: any) => {
        console.log(data.profile);
        this.profile = data.profile;
        // Load the current user's data.
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe(() => {
      this.cd.markForCheck();
    });
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
