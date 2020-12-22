import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(req);
    console.log(currentUser);
    if (currentUser && currentUser.Data) {
      const newReq = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `${currentUser.Data}`
        }
      });
      console.log(newReq);
      // return next.handle(newReq);
      return next.handle(newReq).pipe(retry(2));
    }
    return next.handle(req);
  }
}
