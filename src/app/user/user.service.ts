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
  private notificationBaseUrl = apiUrl + 'api/notification/';
  private blogBaseUrl = apiUrl + 'api/content/texts/';
  private userUpdateBaseUrl = apiUrl + 'api/user/name';

  public getUserInfo(id: string): Observable<UserInfoEntity> {
    let userUrl = this.userBaseUrl + id;
    // console.log(userUrl);
    return this.http.get<UserInfoEntity>(userUrl);
    // return this.http.get<UserInfoEntity>(userUrl, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  public getNotification(): Observable<UserNotificationEntity> {
    let notificationUrl = this.notificationBaseUrl + 'all';
    // console.log(notificationUrl);
    return this.http.get<UserNotificationEntity>(notificationUrl);
  }

  public deleteNotification(id: string) {
    let deleteUrl = this.notificationBaseUrl + id;
    console.log(deleteUrl);
    return this.http.delete<any>(deleteUrl);
  }

  public getUserBlog(id: string, pageId: number, pageSize: number): Observable<UserBlogEntity> {
    let blogUrl = this.blogBaseUrl + id;
    console.log(blogUrl);
    return this.http.get<UserBlogEntity>(blogUrl,
    {
      params: {
        page: `${pageId}`,
        per_page: `${pageSize}`,
      }
    });
  }

  public updateUsernamePost(newName: string) {
    return this.http.post<any>(this.userUpdateBaseUrl, {name: newName});
  }
}
