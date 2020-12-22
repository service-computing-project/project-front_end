import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { UserInfoEntity, InfoEntity, UserBlogEntity, BlogDataEntity, UserNotificationEntity, NotificationEntity } from './user.entity';
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
  userBlogData: BlogDataEntity[];
  userNotificationData: UserNotificationEntity; //如果查看的页不是当前用户 那么不能显示通知
  userNotifications: NotificationEntity[];
  userId: string;

  currentPageId: number;
  pageSize: number;
  isLastPage: boolean;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
    this.flushData();

    // 如果查看的页不是当前用户 那么不能显示通知
    // var currentUser = localStorage.getItem('currentUser');
    // if(currentUser) {
    //   console.log(currentUser);
    // }

    this.currentPageId = 1;
    this.pageSize = 2;
    this.isLastPage = false;
    this.getBlogs(this.currentPageId, this.pageSize);
    this.getNotification();
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
      this.userNotificationData = res;
      this.userNotifications = res.Notifications;
      console.log(res);
      console.log(res.Notifications);
      console.log(res.Notifications[0]);
      console.log(res.Notifications[0].Content);
    });
  }

  isBoy() {
    return this.userInfoData.Info.Gender == 0;
  }

  getBlogs(pageId: number, pageSize: number): void {
    this.userService.getUserBlog(this.userId, pageId, pageSize).subscribe(res => {
      this.userBlogData = res.Data;
      console.log(res);
    });
  }



}
