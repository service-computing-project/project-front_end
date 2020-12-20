import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from '../app.config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private readonly registerService: RegisterService) { }

  model: any = {};
  loading = false;

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.registerService.postRegister("1", "1", "1").subscribe(data => {
      console.log(data);
    });
    // return this.http.post(apiUrl + 'api/user/register', this.model)
    //   .subscribe(
    //     data => {
    //       console.log("Register Successfully!");
    //       this.router.navigate(['/login']);
    //     },
    //     error => {
    //       console.log(error);
    //       this.loading = false;
    //     });
  }

}
