import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserInfoEntity, InfoEntity, UserBlogEntity, BlogDataEntity, UserNotificationEntity } from './user.entity';
import { apiUrl } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  private userBaseUrl = apiUrl + 'api/user/info/';
  private notificationBaseUrl = apiUrl + 'api/notification/all';
  private blogBaseUrl = apiUrl + 'api/content/texts/';

  public getUserInfo(id: string): Observable<UserInfoEntity> {
    let userUrl = this.userBaseUrl + id;
    return this.http.get<UserInfoEntity>(userUrl);
  }

  public getNotification(): Observable<UserNotificationEntity> {
    console.log(this.notificationBaseUrl);
    return this.http.get<UserNotificationEntity>(this.notificationBaseUrl);
  }

  public getUserBlog(id: string, pageId: number, pageSize: number): Observable<UserBlogEntity> {
    let blogUrl = this.blogBaseUrl + id;
    return this.http.get<UserBlogEntity>(blogUrl);
  }
}
