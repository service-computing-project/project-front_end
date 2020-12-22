import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PublicRes, PublicReq, NewPostReq, NewPostRes } from './home.entity';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private reqUrl = 'http://47.103.210.109:8080/';
  private publicUrl = this.reqUrl + 'api/content/public';

  constructor(
    private http: HttpClient
  ) { }

  public getPublicDataByPage(pageid: number, pagesz: number): Observable<PublicRes> {
    let param: PublicReq = {
      page: pageid,
      per_page: pagesz,
    }
    console.log('public get req', this.publicUrl, 'param', param);
    return this.http.get<PublicRes>(this.publicUrl, {
      params: {
        page: `${pageid}`,
        per_page: `${pagesz}`,
      }
    });
  }

  public sendNewPost(p_detail: string, p_tags: string[], p_is_public: boolean) {
    let url = `${this.reqUrl}api/content/text`;
    let postData: NewPostReq = {
      detail: p_detail,
      tags: p_tags,
      isPublic: p_is_public
    };
    return this.http.post<NewPostRes>(url, postData);
  }
}
