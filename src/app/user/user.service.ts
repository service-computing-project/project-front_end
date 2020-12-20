import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserInfoEntity, InfoEntity } from './user.entity';
import { apiUrl } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  private userBaseUrl = 'api/user/info/';

  public getUserInfo(id: string): Observable<UserInfoEntity> {
    let userUrl = this.userBaseUrl + id;
    return this.http.get<UserInfoEntity>(userUrl);
  }
}
