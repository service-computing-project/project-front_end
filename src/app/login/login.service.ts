import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { apiUrl } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginReqUrl = apiUrl + "api/user/login";

  constructor(private http: HttpClient) { }

  public postLogin(usr: string, pass: string) {
    let postData = {
      username: usr,
      password: pass
    };
    return this.http.post<any>(this.loginReqUrl, postData);
  }
}
