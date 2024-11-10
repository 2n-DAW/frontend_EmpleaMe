import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink  } from '@angular/router';
import { User, Comment } from '../../../core/models';
import { UserService, CommentService } from '../../../core/services';


@Component({
  selector: 'app-card-comment',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-comment.component.html',
  styleUrl: './card-comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCommentComponent implements OnInit{
  @Input() comment: Comment = {} as Comment;
  @Output() commentDeleted = new EventEmitter<number>();

  currentUser!: User;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('Comment:', this.comment);

    this.userService.currentUser.subscribe(
        (userData: User) => {
            this.currentUser = userData;
            this.cd.markForCheck();
        }
    );

    console.log('currentUsername:', this.currentUser.username);
    console.log('comment:', this.comment);
  }

  deleteComment() {
    this.commentService.deleteCommentById(this.comment.id).subscribe(
      (data: any) => {
        console.log('Delete Comment', data);
        this.commentDeleted.emit(this.comment.id);
        this.cd.markForCheck();
        // this.cdr.detectChanges();
      });
  }
}
