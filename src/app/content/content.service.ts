import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ContentDetailRes, UpdatePostReq,UpdatePostRes } from './content.entity'

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private reqUrl = 'http://47.103.210.109:8080/';
  private contentDetailUrl = this.reqUrl + 'api/content/detail/';
  private contentUpdateUrl = '/api/content/update';

  constructor(
    private http: HttpClient
  ) { }

  public getContentById(contentID: string) : Observable<ContentDetailRes> {
    let url = this.contentDetailUrl + contentID;
    console.log(url);
    return this.http.get<ContentDetailRes>(url);
  }

  public updatePost(p_id: string, p_detail: string, p_tags: string[], p_isPublic: boolean) {
    let postData: UpdatePostReq = {
      contentID: p_id,
      detail: p_detail,
      tags: p_tags,
      isPublic: p_isPublic
    };
    return this.http.post<UpdatePostRes>(this.contentUpdateUrl, postData);
  }

  public deletePost(contentID: string) {
    let endPoints = 'api/content' + contentID;
    return this.http.delete(this.reqUrl + endPoints).subscribe(data => {
      console.log(data);
    });
  }
}
