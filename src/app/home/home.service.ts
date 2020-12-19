import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PublicRes, ContentDetailRes } from './home.entity';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private reqUrl = 'http://47.103.210.109:8080/';
  private publicUrl = this.reqUrl + 'api/content/public';

  constructor(
    private http: HttpClient
  ) { }

  public getAllPublicData(): Observable<PublicRes> {
    console.log(this.publicUrl);
    return this.http.get<PublicRes>(this.publicUrl);
  }
}
