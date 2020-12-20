import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from "@angular/router";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isVisible = false;
  isLoginStatus = false;
  userId: string;
  // userId = "5fd8e8a5c93c73399fa8d448";
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  isLogin(){
    return this.isLoginStatus;
  }

  jumpToUser(): void {
    this.router.navigate(['/user/'+this.userId]);
  }

  jumpToLogin(): void {
    this.router.navigate(['/login']);
  }

  showBar(){
    // var locationUrl = Location.search();
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   console.log(params);
    // });
    return true;
  }

}
