import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http'
import { apiUrl } from '../app.config';
import { ReturnData } from '../user/user.entity'
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private readonly userService: UserService) { }

  model: any = {};
  loading = false;
  // returnUrl: string;

  ngOnInit(): void {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

  testLogin() {
    // this.userService.getUserInfo("5fd8e8a5c93c73399fa8d448").subscribe(res =>{
    //   this.userData = res;
    //   if(this.userData.State != 'success') {
    //     this.router.navigate(['/404']);
    //   }
    // });
    this.http.post<ReturnData>(apiUrl + 'api/user/login', { username: "test_reg", password: "123456" }).subscribe(res=>{
      console.log(res);
    });
  }

}
