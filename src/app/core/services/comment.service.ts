import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models/comment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug: string, payload: any): Observable<Comment> {
    return this.apiService.post(`/${slug}/comments`, { comment: payload })
      .pipe(map(data => data.comment));
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.apiService.get(`/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  delete(slug: string, commentId: string): Observable<Comment> {
    return this.apiService.delete(`/${slug}/comments/${commentId}`);
  }
}
