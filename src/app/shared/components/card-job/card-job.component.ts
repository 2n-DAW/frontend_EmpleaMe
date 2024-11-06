import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Job, Contract, WorkingDay, Province, User } from '../../../core/models';
import { UserService } from '../../../core/services';
import { FavoriteButtonComponent } from '../buttons/favorite-button/favorite-button.component';
import { InscriptionButtonComponent } from '../buttons/inscription-button/inscription-button.component';

@Component({
    selector: 'app-card-job',
    standalone: true,
    imports: [CommonModule, RouterLink, FavoriteButtonComponent, InscriptionButtonComponent],
    templateUrl: './card-job.component.html',
    styleUrl: './card-job.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardJobComponent implements OnInit{
    @Input() job: Job = {} as Job;
    @Input() listProvinces: Province[] = [];

    currentUser!: User;
    user_email!: string;
    isAuthenticated!: boolean;
    currentUserType!: String;
    canModify!: boolean;
    canInscription!: boolean;
    // contract!: Contract;
    // workingDay!: WorkingDay;
    // province!: Province;

    constructor(
        private router: Router,
        private userService: UserService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        // if (this.jobs) {
        //   this.contract = this.jobs.id_contract;
        //   console.log(this.jobs.id_contract.contract_name);
        //   this.workingDay = this.jobs.id_workingDay;
        //   this.province = this.jobs.id_province;
        // }

        console.log(this.job);

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
    }

    goToDetails(slug: string) {
        this.router.navigate(['/details', slug]);
    }

    onToggleFavorite(favorited: boolean) {
        this.job.favorited = favorited;
    
        if (favorited) {
            this.job.favoritesCount++;
        } else {
            this.job.favoritesCount--;
        }
    }

    handleInscription(data: number) {
        this.job.isInscripted = data;
        console.log(this.job.isInscripted);
    }
}
