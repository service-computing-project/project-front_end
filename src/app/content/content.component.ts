import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
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
  isEditVisible: boolean;
  isEditOkLoading: boolean;
  isLiked: boolean;
  form: FormGroup;

  constructor(
    private readonly contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private nzModal: NzModalService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      content: [null, [Validators.maxLength(140)]]
    });
  }

  ngOnInit(): void {
    this.isEditVisible = false;
    this.isEditOkLoading = false;
    this.isLiked = false;

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
    let form = this.form.value;
    this.isEditOkLoading = true;
    console.log('form before update post', this.form.value);
    this.contentService.
      updatePost(this.contentId, form.content, this.contentDetail.Tag, this.contentDetail.Public)
      .subscribe(data => {
        console.log('update post response', data);
        if (data.State === 'success') {
          this.contentDetail.Detail = form.content;
        }
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

  isLikedByUser() {
    this.contentService
      .getAllLikeUsers(this.contentId)
      .subscribe(data => {
        console.log('get like response', data);
        console.log('currentUser', localStorage.getItem('currentUser'));
        if (data.State === 'success') {
          for (let i = 0; i < data.Data.length; i++) {
            if (data.Data[i] === localStorage.getItem('currentUser')) {
              this.isLiked = true;
            }
          }
        }
        else {
          console.log('get like response error:', data.State);
        }
      });
  }

  deleteContent() {
    this.contentService
      .deletePost(this.contentId)
      .subscribe(data => {
        console.log('delete response', data);
        if (data.State === 'success') {
          this.router.navigateByUrl('home');
        }
      });
  }

  likeContent() {
    this.contentService
      .likePost(this.contentId)
      .subscribe(data => {
        console.log('like response', data);
        // if (data.State === 'success') {
        //   this.isLiked = true;
        // }
        // debug
        this.isLiked = true;
      });
  }

  unlikeContent() {
    this.contentService
      .unlikePost(this.contentId)
      .subscribe(data => {
        console.log('unlike response', data);
        if (data.State === 'success') {
          this.isLiked = false;
        }
      })
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
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel delete')
    });
  }

  goBack(): void {
    this.location.back();
  }
}
