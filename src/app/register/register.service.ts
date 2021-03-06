import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { apiUrl } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerReqUrl = apiUrl + "api/user/register";

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
