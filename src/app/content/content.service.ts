import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ContentDetailRes, UpdatePostReq, UpdatePostRes, LikePostRes, DeletePostRes, LikeGetRes } from './content.entity'
import { NewPostReq, NewPostRes } from '../home/home.entity';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private reqUrl = 'http://47.103.210.109:8080/';
  private contentDetailUrl = this.reqUrl + 'api/content/detail/';
  private contentUpdateUrl = this.reqUrl + 'api/content/update';
  private reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

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
    // console.log('post data', postData);
    return this.http.post<UpdatePostRes>(this.contentUpdateUrl, postData);
  }

  public deletePost(contentID: string) {
    let endPoints = 'api/content/' + contentID;
    return this.http.delete<DeletePostRes>(this.reqUrl + endPoints, {headers: this.reqHeader});
  }

  public likePost(contentID: string) {
    let likeReqUrl = `${this.reqUrl}api/like/${contentID}`;
    // let likeReqUrl = `${this.reqUrl}api/like/5c3765bd7a2bdd000111e107`;
    console.log('like request url', likeReqUrl);
    return this.http.post<LikePostRes>(likeReqUrl, {});
  }

  public unlikePost(contentID: string) {
    let unlikeReqUrl = `${this.reqUrl}api/like/${contentID}`;
    console.log('unlike request url', unlikeReqUrl);
    return this.http.patch<LikePostRes>(unlikeReqUrl, {});
  }

  public getAllLikeUsers(contentID: string) {
    let url = `${this.reqUrl}api/like/${contentID}`;
    console.log('get likes url', url);
    return this.http.get<LikeGetRes>(url);
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
