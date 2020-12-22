import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(req);
    if (currentUser && currentUser.Data) {
      const newReq = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${currentUser.Data}`
        }
      });
      console.log(newReq);
      return next.handle(newReq);
    }
    return next.handle(req);
  }
}
