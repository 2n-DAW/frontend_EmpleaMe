import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User, Job, Profile, InscriptionList } from '../../../core/models';
import { UserService, JobService, ProfilesService } from '../../../core/services';
import { InscriptionButtonComponent } from '../buttons/inscription-button/inscription-button.component';


@Component({
  selector: 'app-card-inscription',
  standalone: true,
  imports: [CommonModule, RouterLink, InscriptionButtonComponent],
  templateUrl: './card-inscription.component.html',
  styleUrl: './card-inscription.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInscriptionComponent implements OnInit{
  @Input() inscription: InscriptionList = {} as InscriptionList;

  currentUser!: User;
  user_email!: string;
  isAuthenticated!: boolean;
  currentUserType!: String;
  jobs: Job[] = [];
  job!: Job;
  profile!: Profile;
  canModify!: boolean;
  canInscription!: boolean;

  constructor(
      private router: Router,
      private userService: UserService,
      private jobService: JobService,
      private profilesService: ProfilesService,
      private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
        (userData: User) => {
            this.currentUser = userData;
            this.user_email = this.currentUser.email;
            this.cd.markForCheck();
        }
    );

    this.userService.isAuthenticated.subscribe(
        (data: any) => {
            this.isAuthenticated = data;
            this.cd.markForCheck();
        }
    );

    this.userService.currentUserType.subscribe(
        (userType: String) => {
            this.currentUserType = userType;
            this.canModify =
                (this.currentUser.username !== this.job.author.username) &&
                ((this.currentUserType === 'client') || (this.currentUserType === 'company'));
            this.canInscription =
                (this.currentUser.username !== this.job.author.username) && (this.currentUserType === 'client');
            this.cd.markForCheck();
        }
    );

    this.jobService.getJob(this.inscription.job).subscribe(
      (data: any) => {
        this.jobs = data.jobs;
        console.log(this.jobs);
        // this.jobCount = data.job_count;
      });

      // this.profilesService.getInscriptionUser(this.user_email).subscribe(
      //   (data: any) => {
      //     this.profile = data.profile;
      //     console.log(data);
      //   });
  }

  goToDetails(slug: string) {
      this.router.navigate(['/details', slug]);
  }

  handleInscription(data: number) {
      this.job.isInscripted = data;
      console.log(this.job.isInscripted);
  }
}

