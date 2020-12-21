import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NavBarService } from './nav-bar.service';
import { UserService } from '../user/user.service';

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
    private location: Location,
    private readonly navBarService: NavBarService,
    private readonly userService: UserService) {
    }

  ngOnInit(): void {
  }

  isLogin(){
    return localStorage.getItem('currentUser');
  }

  jumpToUser(): void {
    this.userService.getUserInfo("self").subscribe(res =>{
      console.log(res);
      this.userId = res.ID;
    });
    // this.router.navigate(['/user/'+this.userId]);
  }

  jumpToLogin(): void {
    this.router.navigate(['/login']);
  }

  showBar(){
    return !(this.location.isCurrentPathEqualTo('/login') || this.location.isCurrentPathEqualTo('/register'));
  }

  logOut() {
    this.navBarService.postLogout().subscribe(res => {
      console.log(res);
    });
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

}
