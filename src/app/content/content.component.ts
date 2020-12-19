import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isEditVisible = false;
  isEditOkLoading = false;
  form: FormGroup;

  constructor(
    private readonly contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router,
    private nzModal: NzModalService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      content: [null, [Validators.maxLength(140)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contentId = params.get('id');
      console.log('content id', this.contentId);
      this.flushData();
    });
  }

  flushData() {
    this.contentService.
      getContentById(this.contentId)
      .subscribe(data => {
        console.log('response', data);
        this.contentDetail = data.Data;
        this.authorData = data.User;
        // debug
        this.contentDetail.Tag.push('test tag2');
      })
  }

  showEditModal(): void {
    this.isEditVisible = true;
    this.form.setValue({content: this.contentDetail.Detail});
  }

  handleEditOk(): void {
    this.isEditOkLoading = true;
    console.log('form before update post', this.form.value);
    this.contentService.
      updatePost(this.contentId, this.form.value.content, this.contentDetail.Tag, this.contentDetail.Public)
      .subscribe(data => {
        console.log('update post response', data);
      })
    setTimeout(() => {
      this.isEditVisible = false;
      this.isEditOkLoading = false;
      // this.flushData();
    }, 100);
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }

  deleteContent() {
    this.contentService.deletePost(this.contentId);
  }

  addHashTag(tag: string): string {
    return '#' + tag;
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
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
        this.router.navigateByUrl('home');
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel delete')
    });
  }
}
