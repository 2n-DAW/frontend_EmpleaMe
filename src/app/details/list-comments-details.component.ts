import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { User, Comment } from '../core/models';
import { CommentService } from '../core/services';
import { AddCommentsDetailsComponent } from './add-comments-details.component';

@Component({
    selector: 'app-list-comments-details',
    standalone: true,
    imports: [CommonModule, RouterLink, AddCommentsDetailsComponent],
    templateUrl: './list-comments-details.component.html',
    styleUrl: './list-comments-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCommentsDetailsComponent implements OnInit {
    comments: Comment[] = [];
    slug!: string;
    canModifyComment: boolean = false;

    @Input() isAuthenticated!: boolean;
    @Input() currentUser!: User;
    
    constructor(
        private commentService: CommentService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.slug = params['slug'];
            this.populateComments();
        });
    }

    populateComments() {
        this.commentService.getAll(this.slug).subscribe(
            (comments) => {
                this.comments = comments;
                this.cd.markForCheck();
            }
        );
    }

    onCommentAdded(comment: Comment) {
        this.comments.unshift(comment);
    }
    
    deleteComment(comment: any) {
        this.commentService.delete(this.slug, comment.id).subscribe(() => {
            this.comments = this.comments.filter((item) => item.id !== comment.id);
            this.cd.markForCheck();
        });
    }
    
}
