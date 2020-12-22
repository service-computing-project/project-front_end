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
    localStorage.removeItem('currentUsername');
  }

  login() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUsername');
    this.loading = true;
    this.loginService.postLogin(this.model.username, this.model.password).subscribe(
      user => {
        console.log(user);
        if (user.State == 'success' && user.Data) {
          console.log(JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('currentUsername', this.model.username);

          // to be modified
          this.createSuccessNotification();
          this.router.navigate(['/home']);
        }
        else {
          if (user.State == 'username_notexist') {
            this.wrongState = 'Username Not Exist!';
          }
          else if (user.State == 'password_error') {
            this.wrongState = 'Wrong Password!';
          }
          this.createFailNotification();
          this.loading = false;
        }
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  createSuccessNotification(): void {
    this.notification
      .blank(
        'Notification',
        'Login Successfully!',
        {
          nzPlacement: 'bottomRight'
        }
      )
      .onClick.subscribe(() => {
      });
  }

  createFailNotification(): void {
    this.notification
      .blank(
        'Notification',
        this.wrongState,
        {
          nzPlacement: 'bottomRight'
        }
      )
      .onClick.subscribe(() => {
      });
  }

}
