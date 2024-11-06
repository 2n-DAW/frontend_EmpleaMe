import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Job, User } from '../core/models';
import { UserService } from '../core/services';
import { ListCommentsDetailsComponent } from './list-comments-details.component';
import { SharedModule } from '../shared';

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [RouterLink, ListCommentsDetailsComponent, SharedModule ],
    templateUrl: './details.component.html',
    styleUrl: './details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
    job!: Job;
    slug!: string;
    currentUser!: User;
    user_email!: string;
    isAuthenticated!: boolean;
    currentUserType!: String;
    // user_image!: string;
    canModify!: boolean;
    canInscription!: boolean;

    constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(
            (jobData: any) => {
                this.slug = jobData.job.job.slug;
                this.job = jobData.job.job;
                console.log(this.job);
                this.cd.markForCheck();
            }
        );

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
                console.log(this.currentUserType);
                this.canModify =
                    (this.currentUser.username !== this.job.author.username) &&
                    ((this.currentUserType === 'client') || (this.currentUserType === 'company'));
                this.canInscription =
                    (this.currentUser.username !== this.job.author.username) && (this.currentUserType === 'client');
                this.cd.markForCheck();
            }
        );
    }

    onToggleFavorite(favorited: boolean) {
        this.job.favorited = favorited;
    
        if (favorited) {
            this.job.favoritesCount++;
        } else {
            this.job.favoritesCount--;
        }
    }
    
    onToggleFollowing(following: boolean) {
        this.job.author.following = following;
    }

    handleInscription(data: number) {
        this.job.isInscripted = data;
        console.log(this.job.isInscripted);
    }

}
