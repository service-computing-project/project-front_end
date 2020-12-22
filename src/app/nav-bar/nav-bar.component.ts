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

  // subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly navBarService: NavBarService,
    private readonly userService: UserService) {

  }

  isVisible = false;
  isLoginStatus = false;
  userId: string;

  ngOnInit(): void {
    // this.subscription = this.router.events.pipe().subscribe();
  }

  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

  isLogin(){
    return localStorage.getItem('currentUser');
  }

  jumpToUser(): void {
    this.userService.getUserInfo("self").subscribe(res =>{
      this.userId = res.ID;
      console.log(this.userId);
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('/user'+this.userId).then(() => {
        this.router.navigate(['/user/'+this.userId]);
      });
    });
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
    localStorage.removeItem('currentUsername');
    this.router.navigate(['/login']);
  }

}
