import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { UserInfoEntity, InfoEntity, UserBlogEntity, BlogDataEntity, UserNotificationEntity } from './user.entity';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private readonly userService: UserService
  ) { }

  userInfoData: UserInfoEntity;
  userBlogData: UserBlogEntity;
  userNotificationData: UserNotificationEntity;
  userId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
    this.flushData();
    var currentUser = localStorage.getItem('currentUser');
    if(currentUser) {
      console.log(currentUser);
    }
    this.getNotification();
    // this.userBlogData = {
    //   "State": "success",
    //   "Data": [
    //   {
    //     "ID": "5b35115a7a2bdd4aac29eb74",
    //     "Name": "我是一个测试账户",
    //     "Detail": "test内容",
    //     "OwnID": "5b3510fe7a2bdd4aac29eb73",
    //     "PublishDate": 1530204506000,
    //     "LikeNum": 2,
    //     "CommentNum": 1,
    //     "Public": true,
    //     "Tag": [
    //       "说明"
    //     ]
    //   }]
    // };
    // this.getNotification();
    // this.getBlogs();
  }

  flushData(): void {
    this.userService.getUserInfo(this.userId).subscribe(res =>{
      this.userInfoData = res;
      if(this.userInfoData.State != 'success') {
        this.router.navigate(['/404']);
      }
    });
  }

  getNotification(): void {
    this.userService.getNotification().subscribe(res => {
      // this.userNotificationData = res;
      console.log(res);
    });
  }

  isBoy() {
    return this.userInfoData.Info.Gender == 0;
  }

  // getBlogs(): void {
  //   this.userService.getUserBlog(this.userId).subscribe(res => {
  //     console.log(res);
  //   });
  // }



}
