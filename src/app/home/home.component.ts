import { Component, OnInit } from '@angular/core';
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

  constructor(
    private readonly homeService: HomeService,
    private readonly contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.homeService
      .getAllPublicData()
      .subscribe(data => {
        this.publicContents = data.Data;
        for (let i = 0; i < this.publicContents.length; i++) {
          this.publicContents[i].isLiked = false;
          this.likeContent(this.publicContents[i].Data.ID, i);
        }

        console.log('res', data);
        console.log('this.allData', this.publicContents);
      });
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
