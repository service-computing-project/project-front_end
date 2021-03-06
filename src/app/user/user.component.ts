import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { UserInfoEntity, InfoEntity, UserBlogEntity, BlogDataEntity, UserNotificationEntity, NotificationEntity } from './user.entity';
import { UserService } from './user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
    private notification: NzNotificationService
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

  isSelf: boolean;
  isEditVisible: boolean;
  isEditOkLoading: boolean;
  form: FormGroup;

  isDeleteVisible: boolean;
  isDeleteOkLoading: boolean;

  empty = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
    this.flushData();

    this.currentPageId = 1;
    this.pageSize = 3;
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

      let currentUsername = localStorage.getItem('currentUsername');
      if (this.userInfoData.Info.Name != currentUsername) {
        this.isSelf = false;
      }
      else {
        this.isSelf = true;
      }
    });
  }

  getPage(pageId: number, pageSize: number) {
    this.userService
      .getUserBlog(this.userId, pageId, pageSize)
      .subscribe(
        data => {
          if (data.State === 'success') {
            this.currentPageId = pageId;
            this.userBlogData = data.Data;
            if (data.Data.length < pageSize) {
              this.isLastPage = true;
            }
            else {
              this.isLastPage = false;
            }
          }
        },
        error => {
          this.isLastPage = true;
        }
      );
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
          this.createSuccessNotification();
        }
        else {
          this.createFailNotification();
        }
    });
    setTimeout(() => {
      this.isEditVisible = false;
      this.isEditOkLoading = false;
    }, 100);
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }

  showDeleteModal(): void {
    this.isDeleteVisible = true;
  }

  deleteNotification(note: NotificationEntity): void {    // 刷新？
    let id = note.Notification.ID;
    this.userService.deleteNotification(id).subscribe(res => {
      console.log(res);
    })
    this.getNotification();
    this.isDeleteVisible = false
    console.log("deleteConfirm!");
  }

  deleteCancel(): void {
    this.isDeleteVisible = false;
  }

  getNotification(): void {
    this.userService.getNotification().subscribe(res => {
      this.userNotificationData = res;
      this.userNotifications = res.Notifications;
      console.log(res);
      console.log(res.Notifications);
    });
  }

  getBlogs(pageId: number, pageSize: number): void {
    this.userService.getUserBlog(this.userId, pageId, pageSize).subscribe(res => {
      this.userBlogData = res.Data;
      if (res.Data == null) {
        this.empty = true;
      }
      console.log(res);
    });
  }

  jumpToBlog(blog: BlogDataEntity): void {
    this.router.navigate(['/content', blog.ID]);
  }

  createSuccessNotification(): void {
    this.notification
      .blank(
        'Notification',
        '修改成功!',
        {
          nzPlacement: 'bottomRight'
        }
      )
      .onClick.subscribe(() => {
      });
  }

  createFailNotification(): void {
    this.notification
      .blank(
        'Error',
        '用户名已存在！',
        {
          nzPlacement: 'bottomRight'
        }
      )
      .onClick.subscribe(() => {
      });
  }

  isBoy() {
    return this.userInfoData.Info.Gender == 0;
  }

}
