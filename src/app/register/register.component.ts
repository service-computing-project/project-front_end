import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from '../app.config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RegisterService } from './register.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private readonly registerService: RegisterService,
    private notification: NzNotificationService) { }

  model: any = {};
  loading = false;
  wrongState: string;

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.registerService.postRegister(this.model.email, this.model.username, this.model.password).subscribe(
      data => {
        console.log(data);
        if(data.State == 'success') {
          this.createSuccessNotification();
          this.router.navigate(['/login']);
        }
        else {
          if (data.State == 'email_exist') {
            this.wrongState = 'Email Exist!';
          }
          else if (data.State == 'username_exist') {
            this.wrongState = 'Username Exist!';
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
        'Register Successfully!'
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
