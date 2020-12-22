import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserEntity } from '../home/home.entity';
import { ContentEntity } from './content.entity';
import { ContentService } from './content.service';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  contentId: string;
  contentDetail: ContentEntity;
  authorData: UserEntity;
  isEditVisible: boolean;
  isEditOkLoading: boolean;
  isLiked: boolean;
  form: FormGroup;
  isEditable: boolean;
  visibleRangeValues: string[] = ['公开', '仅自己可见'];    // 编辑博客表单中可见范围的可选值
  visibleRangeValue: string = this.visibleRangeValues[0];  // 编辑博客表单中可见范围的选中值

  constructor(
    private readonly contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private nzModal: NzModalService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {
    this.form = this.formBuilder.group({
      content: [null, [Validators.maxLength(140)]],
      tags: [null],
      visibleRange: this.visibleRangeValues[0]
    });
  }

  ngOnInit(): void {
    this.isEditVisible = false;
    this.isEditOkLoading = false;
    this.isLiked = false;
    this.isEditable = false;

    this.route.paramMap.subscribe(params => {
      this.contentId = params.get('id');
      console.log('content id', this.contentId);
      this.flushData();
      this.isLikedByUser();
    });
  }

  flushData() {
    this.contentService.
      getContentById(this.contentId)
      .subscribe(
        data => {
          if (data.State === 'success') {
            console.log('get content by id response', data);
            this.contentDetail = data.Data;
            this.authorData = data.User;
            console.log('current user:', localStorage.getItem('currentUsername'));
            console.log('content author', this.authorData.Name);
            if (this.authorData.Name === localStorage.getItem('currentUsername')) {
              this.isEditable = true;
            }
          }
          else {
            console.log('get content by id response error state', data.State);
          }
        },
        error => {
          console.log('get content by id error', error);
        }
      )
  }

  createNoLoginNotification(): void {
    this.notification
      .blank(
        '提示',
        '请在登陆后执行操作'
      )
      .onClick.subscribe(() => {
      });
  }

  createUpdateOkNotification(): void {
    this.notification
      .blank(
        '提示',
        '编辑成功',
        { nzDuration: 2000 }
      )
      .onClick.subscribe(() => {
      });
  }

  createUpdateFailedNotification(): void {
    this.notification
      .blank(
        '提示',
        '编辑失败',
        { nzDuration: 2000 }
      )
      .onClick.subscribe(() => {
      });
  }

  showEditModal(): void {
    let range = this.contentDetail.Public ? this.visibleRangeValues[0] : this.visibleRangeValues[1];
    let tags_str = this.concatTags(this.contentDetail.Tag);
    this.form.setValue(
      {
        content: this.contentDetail.Detail,
        tags: tags_str,
        visibleRange: range
      }
    );
    this.isEditVisible = true;
  }

  handleEditOk(): void {
    this.isEditOkLoading = true;
    let form = this.form.value;
    form.tags = this.splitTags(form.tags);
    let isPublic = form.visibleRange === '公开' ? true : false;
    console.log('form before update post', this.form.value);
    this.contentService.
      updatePost(this.contentId, form.content, form.tags, isPublic)
      .subscribe(
        data => {
          console.log('update post response', data);
          if (data.State === 'success') {
            this.createUpdateOkNotification();
            this.isEditVisible = false;
            this.isEditOkLoading = false;
            this.flushData();
          }
          else {
            console.log('update post response error state:', data.State);
            this.createUpdateFailedNotification();
            this.isEditVisible = false;
            this.isEditOkLoading = false;
          }
        },
        error => {
          console.log('update post error:',error);
          this.createUpdateFailedNotification();
          this.isEditVisible = false;
          this.isEditOkLoading = false;
        }
      )
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }

  isLikedByUser() {
    this.contentService
      .getAllLikeUsers(this.contentId)
      .subscribe(
        data => {
          console.log('get like response', data);
          console.log('currentUser', localStorage.getItem('currentUsername'));
          if (data.State === 'success') {
            for (let i = 0; i < data.Data.length; i++) {
              if (data.Data[i] === localStorage.getItem('currentUsername')) {
                this.isLiked = true;
              }
            }
          }
          else {
            console.log('get like response error state:', data.State);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteContent() {
    this.contentService
      .deletePost(this.contentId)
      .subscribe(
        data => {
          console.log('delete content response', data);
          if (data.State === 'success') {
            this.router.navigateByUrl('home');
          }
          else {
            console.log('delete content response error state:', data.State);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  likeContent() {
    this.contentService
      .likePost(this.contentId)
      .subscribe(
        data => {
          console.log('like response', data);
          if (data.State === 'success') {
            this.isLiked = true;
            this.contentDetail.LikeNum ++;
          }
          else if (data.State === 'not_login') {
            this.createNoLoginNotification();
          }
          else {
            console.log('like response error state', data.State);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  unlikeContent() {
    this.contentService
      .unlikePost(this.contentId)
      .subscribe(
        data => {
          console.log('unlike response', data);
          if (data.State === 'success') {
            this.isLiked = false;
            this.contentDetail.LikeNum --;
          }
          else if (data.State === 'not_login') {
            this.createNoLoginNotification();
          }
          else {
            console.log('unlike response error state', data.State);
          }
        },
        error => {
          console.log(error);
        }
      )
  }

  addHashTag(tag: string): string {
    return '#' + tag;
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  concatTags(tags: string[]): string {
    return `#${tags.join('#')}`;
  }

  splitTags(tags: string): string[] {
    return tags.split('#').filter(data=>{ return data != '';});
  }

  showDeleteConfirm(): void {
    this.nzModal.confirm({
      nzTitle: '确认删除这条内容吗?',
      nzContent: '<b style="color: red;">删除后无法恢复</b>',
      nzOkText: '删除',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('Confirm delete');
        this.deleteContent();
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel delete')
    });
  }

  goBack(): void {
    this.location.back();
  }
}
