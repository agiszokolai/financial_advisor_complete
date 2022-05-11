import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentType } from 'src/app/commons/models/comment';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends CrudService<CommentType> {

  constructor(protected http: HttpClient) {
    super(http,"comments");
  }

  getCommentsByPeriod(period: string): Observable<CommentType[]> {
    return this.http.get<CommentType[]>(`${this.url}@period=${period}`);
  }
}
