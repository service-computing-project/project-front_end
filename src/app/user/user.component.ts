import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { UserInfoEntity, InfoEntity, UserBlogEntity, BlogDataEntity } from './user.entity';
import { UserService } from './user.service'

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
  userBlogData: BlogDataEntity;
  userId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
    this.flushData();
  }

  flushData(): void {
    this.userService.getUserInfo(this.userId).subscribe(res =>{
      this.userInfoData = res;
      if(this.userInfoData.State != 'success') {
        this.router.navigate(['/404']);
      }
    });
  }

  getBlogs(): void {
    // this.userService.getUserBlog(this.userId).subscribe(res => {
    //   this.userBlogData = res;
    // });
  }



}
