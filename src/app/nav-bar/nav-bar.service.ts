import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { apiUrl } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  logoutReqUrl = apiUrl + "api/user/logout";

  constructor(private http: HttpClient) { }

  public postLogout(): Observable<any> {
    return this.http.post<any>(this.logoutReqUrl, null);
  }
}
