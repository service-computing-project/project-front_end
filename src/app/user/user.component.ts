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

  // Notification: any[];

  currentPageId: number;
  pageSize: number;
  isLastPage: boolean;

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

    this.currentPageId = 1;
    this.pageSize = 2;
    this.isLastPage = false;
    this.getBlogs(this.currentPageId, this.pageSize);
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
      console.log(res);
    });
  }

  isBoy() {
    return this.userInfoData.Info.Gender == 0;
  }

  getBlogs(pageId: number, pageSize: number): void {
    this.userService.getUserBlog(this.userId, pageId, pageSize).subscribe(res => {
      console.log(res);
    });
  }



}
