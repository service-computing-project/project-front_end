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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) {
    }

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
    return !(this.location.isCurrentPathEqualTo('/login') || this.location.isCurrentPathEqualTo('/register'));
  }

}
