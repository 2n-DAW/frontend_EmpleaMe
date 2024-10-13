import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Comment } from '../core/models';
import { CommentService } from '../core/services';


@Component({
    selector: 'app-add-comments-details',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './add-comments-details.component.html',
    styleUrl: './add-comments-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCommentsDetailsComponent implements OnInit {
    commentControl = new FormControl();
    commentFormErrors = {};
    isSubmitting = false;

    @Input() slug!: string;
    @Output() commentAdded = new EventEmitter<Comment>();

    constructor(
        private commentService: CommentService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {}

    addComment() {
        this.isSubmitting = true;
        this.commentFormErrors = {};

        const commentBody = this.commentControl.value;
        if (commentBody) {
            this.commentService.add(this.slug, commentBody).subscribe(
                comment => {
                    this.commentAdded.emit(comment);
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
}
