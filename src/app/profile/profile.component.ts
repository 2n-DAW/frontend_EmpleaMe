import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { concatMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { User, Profile, InscriptionList } from '../core/models';
import { UserService, InscriptionService } from '../core/services';
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
    private inscriptionService: InscriptionService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  inscriptions: InscriptionList[] = [];
  inscriptionStatusCounts: { [key: number]: number } = {
    [-1]: 0,
    1: 0,
    2: 0,
    3: 0
  };
  profile!: Profile;
  currentUser!: User;
  currentUserType!: String;
  isUser!: boolean;

  private routerSubscription!: Subscription;

  ngOnInit() {
    // Suscribirse a los cambios en las rutas
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });

    // Suscribirse al currentUserType
    this.userService.currentUserType.subscribe(
      (userType: String) => {
          this.currentUserType = userType;
          console.log('Current User Type', this.currentUserType)
          this.cd.markForCheck();
      });

    // Cargar inscriptions
    this.inscriptionService.getInscriptions().subscribe({
      next: (data: InscriptionList[]) => {
        this.inscriptions = data;
        this.inscriptionsStatusCont(data);
        console.log(data);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log('Error loading inscriptions:', error);
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

  // Contar inscriptions por status
  inscriptionsStatusCont(inscriptions: InscriptionList[]): void {
    // Reiniciar conteos
    Object.keys(this.inscriptionStatusCounts).forEach(key => {
      this.inscriptionStatusCounts[Number(key)] = 0;
    });

    inscriptions.forEach(inscription => {
      if (inscription.status in this.inscriptionStatusCounts) {
        this.inscriptionStatusCounts[inscription.status]++;
      }
    });

    console.log('Conteos de estado de inscripciones:', this.inscriptionStatusCounts);
  }

  // reloadPage() {
  //   console.log(this.router.url.split('/').slice(1, 3).join('/'));
  //   this.router.navigate([this.router.url.split('/').slice(1, 3).join('/')], { replaceUrl: true });
  // }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
