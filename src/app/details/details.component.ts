import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Comment, Job, User } from '../core/models';
import { JobService, UserService, CommentService } from '../core/services';
import { NgControlStatusGroup } from '@angular/forms';
import { SharedModule } from '../shared';

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [RouterLink, SharedModule ],
    templateUrl: './details.component.html',
    styleUrl: './details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

    job!: Job;
    slug!: string;
    currentUser!: User;
    isAuthenticated!: boolean;
    user_image!: string;
    canModify!: boolean;
    canModifyComment!: boolean;
    
    //@Input() page!: CarouselDetails[];
    comments!: Comment[];
    commentControl = new FormControl();
    commentFormErrors = {};
    isSubmitting = false;
    // isDeleting = false;

    constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private userService: UserService,
    private commentService: CommentService,
    private router: Router,
    private cd: ChangeDetectorRef
    // private ToastrService: ToastrService,
    ) { }

    ngOnInit(): void {
        // Retreive the prefetched job
        this.route.data.subscribe(
            (jobData: any) => {
                this.slug = jobData.job.job.slug;
                this.job = jobData.job.job;

                // Load the comments on this article
                this.populateComments();
                this.cd.markForCheck();
            }
        );

        // Load the current user's data
        this.userService.currentUser.subscribe(
            (userData: User) => {
                this.currentUser = userData;
                this.canModify = (this.currentUser.username === this.job.author.username);
                this.cd.markForCheck();
            }
        );

        this.userService.isAuthenticated.subscribe(
            (data) => {
                this.isAuthenticated = data;
                this.cd.markForCheck();
            }
        );

        this.onCanModifyComment()
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
    
    // deleteJob() {
    //     this.isDeleting = true;
    
    //     this.jobService.deleteJob(this.slug).subscribe(
    //         success => {
    //             this.router.navigateByUrl('/shop');
    //         }
    //     );
    // }
    
    populateComments() {
        this.commentService.getAll(this.slug)
            .subscribe(comments => {
                this.comments = comments;
                this.cd.markForCheck();
            });
    }
    
    addComment() {
        this.isSubmitting = true;
        this.commentFormErrors = {};

        const commentBody = this.commentControl.value;
        if (commentBody) {
            this.commentService
                .add(this.slug, commentBody)
                .subscribe(
                    comment => {
                        this.comments.unshift(comment);
                        this.commentControl.reset('');
                        this.isSubmitting = false;
                        this.cd.markForCheck();
                    },
                    errors => {
                        this.isSubmitting = false;
                        this.commentFormErrors = errors;
                        this.cd.markForCheck();
                    }
            );
        }
    }

    cancelComment() {
        this.commentControl.reset('');
    }
    
    onDeleteComment(comment: any) {
        this.commentService.delete(this.slug, comment.id)
            .subscribe(
                success => {
                    this.comments = this.comments.filter((item) => item !== comment);
                    this.cd.markForCheck();
                }
            );
    }

    onCanModifyComment()  {
        this.canModifyComment = true;
    }

}
