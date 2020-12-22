import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ContentService } from './../content/content.service';

@Component({
  selector: 'app-new-content-editor-button',
  templateUrl: './new-content-editor-button.component.html',
  styleUrls: ['./new-content-editor-button.component.scss']
})
export class NewContentEditorButtonComponent implements OnInit {
  isEditVisible: boolean;
  isEditOkLoading: boolean;
  form: FormGroup;
  visibleRangeValues: string[] = ['公开', '仅自己可见'];    // 编辑新博客表单中可见范围的可选值
  visibleRangeValue: string = this.visibleRangeValues[0];  // 编辑新博客表单中可见范围的选中值

  constructor(
    private readonly contentService: ContentService,
    private router: Router,
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
  }

  splitTags(tags: string): string[] {
    return tags.split('#').filter(data=>{ return data != '';});
  }

  createNoLoginNotification(): void {
    this.notification
      .blank(
        '提示',
        '请在登录后执行操作'
      )
      .onClick.subscribe(() => {
      });
  }

  createSendOkNotification(): void {
    this.notification
      .blank(
        '提示',
        '发送成功',
        { nzDuration: 2000 }
      )
      .onClick.subscribe(() => {
      });
  }

  createSendFailedNotification(): void {
    this.notification
      .blank(
        '提示',
        '发送失败',
        { nzDuration: 2000 }
      )
      .onClick.subscribe(() => {
      });
  }

  showEditModal(): void {
    if (localStorage.getItem('currentUsername')) {
      this.isEditVisible = true;
    }
    else {
      this.createNoLoginNotification();
    }
  }

  handleEditOk(): void {
    this.isEditOkLoading = true;
    let form = this.form.value;
    let tags = [];
    if (form.tags) {
      if (form.tags.length) {
        tags = this.splitTags(form.tags);
      }
    }
    console.log(tags);
    let isPublic = form.visibleRange === '公开' ? true : false;
    console.log('form before send new post', form);
    this.contentService.
      sendNewPost(form.content, tags, isPublic)
      .subscribe(
        data => {
          console.log('send new post response', data);
          if (data.State === 'success') {
            this.form.reset();
            this.form.setValue({
              content: null,
              tags: [],
              visibleRange: this.visibleRangeValues[0]
            });
            this.createSendOkNotification();
            this.isEditVisible = false;
            this.isEditOkLoading = false;
            this.router.navigate(['/content/' + data.Data]);
          }
          else {
            console.log('send new post response error state:', data.State);
            this.createSendFailedNotification();
            this.isEditVisible = false;
            this.isEditOkLoading = false;
          }
        },
        error => {
          console.log('send new post error:',error);
          this.createSendFailedNotification();
          this.isEditVisible = false;
          this.isEditOkLoading = false;
        }
      )
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }
}
