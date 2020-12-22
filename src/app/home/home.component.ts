import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HomeService } from './home.service';
import { PublicDataItem } from './home.entity';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  publicContents: PublicDataItem[];
  currentPageId: number;
  pageSize: number;
  isLastPage: boolean;
  isEditVisible: boolean;
  isEditOkLoading: boolean;
  form: FormGroup;
  visibleRangeValues: string[] = ['公开', '仅自己可见'];    // 编辑新博客表单中可见范围的可选值
  visibleRangeValue: string = this.visibleRangeValues[0];  // 编辑新博客表单中可见范围的选中值

  constructor(
    private readonly homeService: HomeService,
    private readonly contentService: ContentService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      content: [null, [Validators.maxLength(140)]],
      tags: [null],
      visibleRange: this.visibleRangeValues[0]
    });
  }

  ngOnInit(): void {
    this.currentPageId = 1;
    this.pageSize = 2;
    this.isLastPage = false;
    this.getPage(this.currentPageId, this.pageSize);
  }

  getPage(id: number, size: number) {
    console.log('getPage:\n', 'currentPage:', this.currentPageId, 'reqPage:', id);
    this.homeService
      .getPublicDataByPage(id, size)
      .subscribe(
        data => {
          if (data.State === 'success') {
            this.currentPageId = id;
            this.publicContents = data.Data;
            for (let i = 0; i < this.publicContents.length; i++) {
              this.publicContents[i].isLiked = false;
              this.isLikedByUser(this.publicContents[i].Data.ID, i);
            }
            if (data.Data.length < size) {
              this.isLastPage = true;
            }
            console.log('getPublicDataByPage response for page', this.currentPageId, data);
            console.log('this.allData', this.publicContents);
          }
        },
        error => {
          this.isLastPage = true;
          console.log(error);
        }
      );
  }

  addHashTag(tag: string): string {
    return '#' + tag;
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  splitTags(tags: string): string[] {
    return tags.split('#').filter(data=>{ return data != '';});
  }

  isLikedByUser(contentId: string, index: number) {
    this.contentService
      .getAllLikeUsers(contentId)
      .subscribe(
        data => {
          console.log('get like response', data);
          console.log('currentUser', localStorage.getItem('currentUsername'));
          if (data.State === 'success') {
            for (let i = 0; i < data.Data.length; i++) {
              if (data.Data[i] === localStorage.getItem('currentUsername')) {
                this.publicContents[index].isLiked = true;
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

  createNoLoginNotification(): void {
    this.notification
      .blank(
        '提示',
        '请在登陆后执行操作'
      )
      .onClick.subscribe(() => {
      });
  }

  createSendOkNotification(): void {
    this.notification
      .blank(
        '成功',
        '发送成功',
        { nzDuration: 2000 }
      )
      .onClick.subscribe(() => {
      });
  }

  createSendFailedNotification(): void {
    this.notification
      .blank(
        '失败',
        '发送失败',
        { nzDuration: 2000 }
      )
      .onClick.subscribe(() => {
      });
  }

  showEditModal(): void {
    this.isEditVisible = true;
  }

  handleEditOk(): void {
    this.isEditOkLoading = true;
    let form = this.form.value;
    form.tags = this.splitTags(form.tags);
    form.visibleRange = form.visibleRange === '公开' ? true : false;
    console.log('form before send new post', form);
    this.homeService.
      sendNewPost(form.content, form.tags, form.visibleRange)
      .subscribe(
        data => {
          console.log('send new post response', data);
          if (data.State === 'success') {
            this.createSendOkNotification();
            setTimeout(() => {
              this.isEditVisible = false;
              this.isEditOkLoading = false;
              this.getPage(1, this.pageSize);
            }, 400);
          }
          else {
            console.log('send new post response error state:', data.State);
            this.createSendFailedNotification();
            setTimeout(() => {
              this.isEditVisible = false;
              this.isEditOkLoading = false;
            }, 400);
          }
        },
        error => {
          console.log('send new post error:',error);
          this.createSendFailedNotification();
            setTimeout(() => {
              this.isEditVisible = false;
              this.isEditOkLoading = false;
            }, 400);
        }
      )
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }

  likeContent(contentID: string, itemIndex: number) {
    this.contentService
      .likePost(contentID)
      .subscribe(
        data => {
          console.log('like response', data);
          if (data.State === 'success') {
            this.publicContents[itemIndex].isLiked = true;
            this.publicContents[itemIndex].Data.LikeNum ++;
          }
          else if (data.State === 'not_login') {
            this.createNoLoginNotification();
          }
          else {
            console.log('post like response error state:', data.State);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  unlikeContent(contentID: string, itemIndex: number) {
    this.contentService
      .unlikePost(contentID)
      .subscribe(
        data => {
          console.log('unlike response', data);
          if (data.State === 'success') {
            this.publicContents[itemIndex].isLiked = false;
            this.publicContents[itemIndex].Data.LikeNum --;
          }
          else if (data.State === 'not_login') {
            this.createNoLoginNotification();
          }
          else {
            console.log('patch like response error state:', data.State);
          }
        },
        error => {
          console.log(error);
        }
      )
  }
}
