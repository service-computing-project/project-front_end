import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let key = localStorage.getItem('currentUser');
    if (key) {  //如果当前存着token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `${currentUser.Data}`
        }
      });
    }
    else {      //如果当前不是登陆状态（其实好像不需要cookie？
      req = req.clone({
        withCredentials: true
      });
    }
    // console.log(req);
    return next.handle(req);
  }
}
