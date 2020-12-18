import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PublicRes, ContentDetailRes } from './home.entity';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  private reqUrl = 'http://47.103.210.109:8080/';
  private publicUrl = this.reqUrl + 'api/content/public';
  private contentDetailUrl = this.reqUrl + 'api/content/detail/';

  public getAllPublicData(): Observable<PublicRes> {
    console.log(this.publicUrl);
    return this.http.get<PublicRes>(this.publicUrl);
  }

  public getContentById(contentID: string) : Observable<ContentDetailRes> {
    let url = this.contentDetailUrl + contentID;
    console.log(url);
    return this.http.get<ContentDetailRes>(url);
  }

  // public getEventDetail(id: number): Observable<EventDetailEntity> {
  //   let postData: EventPostReq = { event_id: id };
  //   return this.http.post<EventDetailEntity>(this.eventDetailReqUrl, postData);
  // }
}
