import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerReqUrl = "http://47.103.210.109:8080/api/user/register"

  constructor(private http: HttpClient) { }

  public postRegister(email: string, usr: string, pass: string): Observable<any> {
    let postData = {
      email: email,
      username: usr,
      password: pass
    };
    return this.http.post<any>(this.registerReqUrl, postData);
  }
}
