import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { UserInfoEntity, InfoEntity, UserBlogEntity, BlogDataEntity, UserNotificationEntity, NotificationEntity } from './user.entity';
import { UserService } from './user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private readonly userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      content: [null, [Validators.maxLength(140)]]
    });
  }

  userInfoData: UserInfoEntity;
  userBlogData: BlogDataEntity[];
  userNotificationData: UserNotificationEntity; //如果查看的页不是当前用户 那么不能显示通知
  userNotifications: NotificationEntity[];
  userId: string;

  currentPageId: number;
  pageSize: number;
  isLastPage: boolean;

  isEditVisible: boolean;
  isEditOkLoading: boolean;
  form: FormGroup;

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

  // 如果查看的页不是当前用户 那么不能修改名字
  showEditModal(): void {
    this.isEditVisible = true;
    this.form.setValue({content: this.userInfoData.Info.Name});
  }

  handleEditOk(): void {
    let form = this.form.value;
    this.isEditOkLoading = true;
    console.log('form before update post', this.form.value);
    this.userService.
      updateUsernamePost(form.content)
      .subscribe(data => {
        console.log('update post response', data);
        if (data.State === 'success') {
          this.userInfoData.Info.Name = form.content;
        }
      })
    setTimeout(() => {
      this.isEditVisible = false;
      this.isEditOkLoading = false;
    }, 100);
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }

  getNotification(): void {
    this.userService.getNotification().subscribe(res => {
      this.userNotificationData = res;
      this.userNotifications = res.Notifications;
      console.log(res);
      console.log(res.Notifications);
      console.log(res.Notifications[0].Notification);
      console.log(res.Notifications[0].Notification.Content);
    });
  }

  getBlogs(pageId: number, pageSize: number): void {
    this.userService.getUserBlog(this.userId, pageId, pageSize).subscribe(res => {
      this.userBlogData = res.Data;
      console.log(res);
    });
  }

  deleteNotification(note: NotificationEntity): void {    // 刷新？
    let id = note.Notification.ID;
    this.userService.deleteNotification(id).subscribe(res => {
      console.log(res);
    })
    this.getNotification();
  }

  jumpToBlog(blog: BlogDataEntity): void {
    this.router.navigate(['/content', blog.ID]);
  }

  isBoy() {
    return this.userInfoData.Info.Gender == 0;
  }

}
