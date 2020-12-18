import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserInfoEntity, InfoEntity } from './user.entity';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Access-Control-Allow-Origin': '*'
//   })
// };

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  private userBaseUrl = 'http://47.103.210.109:8080/api/user/info/';

  public getUserInfo(id: string): Observable<UserInfoEntity> {
    let userUrl = this.userBaseUrl + id;
    console.log(userUrl);
    return this.http.get<UserInfoEntity>(userUrl);
  }
}
