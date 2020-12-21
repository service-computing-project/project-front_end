import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private readonly homeService: HomeService,
    private readonly contentService: ContentService
  ) { }

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

  isLikedByUser(contentId: string, index: number) {
    this.contentService
      .getAllLikeUsers(contentId)
      .subscribe(data => {
        console.log('get like response', data);
        console.log('currentUser', localStorage.getItem('currentUser'));
        if (data.State === 'success') {
          for (let i = 0; i < data.Data.length; i++) {
            if (data.Data[i] === localStorage.getItem('currentUser')) {
              this.publicContents[index].isLiked = true;
            }
          }
        }
        else {
          console.log('get like response error:', data.State);
        }
      });
  }

  // handleEditOk(): void {
  //   let form = this.form.value;
  //   this.isEditOkLoading = true;
  //   console.log('form before update post', this.form.value);
  //   this.contentService.
  //     updatePost(this.contentId, form.content, this.contentDetail.Tag, this.contentDetail.Public)
  //     .subscribe(data => {
  //       console.log('update post response', data);
  //       if (data.State === 'success') {
  //         this.contentDetail.Detail = form.content;
  //       }
  //     })
  //   setTimeout(() => {
  //     this.isEditVisible = false;
  //     this.isEditOkLoading = false;
  //     // this.flushData();
  //   }, 100);
  // }

  // handleEditCancel(): void {
  //   this.isEditVisible = false;
  // }

  likeContent(contentID: string, itemIndex: number) {
    this.contentService
      .likePost(contentID)
      .subscribe(data => {
        console.log('like response', data);
        if (data.State === 'success') {
          this.publicContents[itemIndex].isLiked = true;
        }
        // debug
        // this.publicContents[itemIndex].isLiked = true;
      });
  }

  unlikeContent(contentID: string, itemIndex: number) {
    this.contentService
      .unlikePost(contentID)
      .subscribe(data => {
        console.log('unlike response', data);
        if (data.State === 'success') {
          this.publicContents[itemIndex].isLiked = false;
        }
      })
  }
}
