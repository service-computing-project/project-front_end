import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { apiUrl } from '../app.config';
import { LoginService } from '../login/login.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators'

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
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private notification: NzNotificationService) { }

  model: any = {};
  loading = false;
  wrongState: string;

  ngOnInit(): void {
    localStorage.removeItem('currentUser');
  }

  login() {
    localStorage.removeItem('currentUser');
    this.loading = true;
    this.loginService.postLogin(this.model.username, this.model.password).subscribe(
      user => {
        console.log(user);
        if (user && user.token) {
          console.log("ok");
          localStorage.setItem('currentUser', JSON.stringify(user));

          // to be modified
          this.createSuccessNotification();
          this.router.navigate(['/home']);
        }
      }
    );
    // this.loginService.postLogin(this.model.username, this.model.password).subscribe(
    //   data => {
    //     console.log(data);
    //     if(data.State == 'success') {
    //       console.log(JSON.stringify(this.model));
    //       localStorage.setItem('currentUser', this.model.username);//JSON.stringify(this.model)

    //       this.createSuccessNotification();
    //       this.router.navigate(['/home']);
    //     }
    //     else {
    //       if (data.State == 'username_notexist') {
    //         this.wrongState = 'Username Not Exist!';
    //       }
    //       else if (data.State == 'password_error') {
    //         this.wrongState = 'Wrong Password!';
    //       }
    //       this.createFailNotification();
    //       this.loading = false;
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // );
  }

  createSuccessNotification(): void {
    this.notification
      .blank(
        'Notification',
        'Login Successfully!'
      )
      .onClick.subscribe(() => {
      });
  }

  createFailNotification(): void {
    this.notification
      .blank(
        'Notification',
        this.wrongState
      )
      .onClick.subscribe(() => {
      });
  }

}
