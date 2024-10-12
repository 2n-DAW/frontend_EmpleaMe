import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, Comment } from '../../../core/models';
import { UserService } from '../../../core/services';


@Component({
    selector: 'app-comments-job',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './comments-job.component.html',
    styleUrl: './comments-job.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsJobComponent implements OnInit, OnDestroy {
    constructor(
        private userService: UserService,
        private cd: ChangeDetectorRef
    ) {}

    private subscription!: Subscription;

    @Input() comment!: Comment;
    @Output() deleteComment = new EventEmitter<boolean>();
    @Output() canModifyComment = new EventEmitter<boolean>();

    ngOnInit() {
        // Load the current user's data
        this.subscription = this.userService.currentUser.subscribe(
            (userData: User) => {
                this.canModifyComment.emit(userData.username === this.comment.author.username);
                this.cd.markForCheck();
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    deleteClicked() {
        this.deleteComment.emit(true);
    }
}
