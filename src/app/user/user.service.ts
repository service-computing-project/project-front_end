import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserInfoEntity, InfoEntity, UserBlogEntity, BlogDataEntity } from './user.entity';
import { apiUrl } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  private userBaseUrl = 'api/user/info/';
  private blogBaseUrl = 'api/content/texts/';

  public getUserInfo(id: string): Observable<UserInfoEntity> {
    let userUrl = this.userBaseUrl + id;
    return this.http.get<UserInfoEntity>(userUrl);
  }

  // public getUserBlog(id: string): Observable<UserBlogEntity> {
  //   let blogUrl = this.blogBaseUrl + id;
  //   return this.http.get<UserBlogEntity>(blogUrl, {page: 1, per_page: 5});
  // }
}
