import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Comment } from '../../../core/models';
import { CommentService } from '../../../core/services';
import { CardCommentComponent } from '../card-comment/card-comment.component';

@Component({
  selector: 'app-list-comments',
  standalone: true,
  imports: [CommonModule, CardCommentComponent],
  templateUrl: './list-comments.component.html',
  styleUrl: './list-comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCommentsComponent implements OnInit{
  comments: Comment[] = [];
  currentProfileUsername!: string;
  today: Date = new Date();

  constructor(
    private commentService: CommentService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.currentProfileUsername = this.router.url.split('/').slice(2, 3).join('/'), { replaceUrl: true };
    console.log(this.currentProfileUsername);

    this.commentService.getCommentsByUser(this.currentProfileUsername).subscribe(
      (data: any) => {
        this.comments = [...data.comments].reverse();
        console.log('Comments Profile', data.comments);
        this.cd.markForCheck();
      });
  }

  onCommentDeleted(commentId: number) {
    this.comments = this.comments.filter(comment => comment.id !== commentId);
    this.cd.markForCheck();
  }
}