import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { UserInfoEntity, InfoEntity } from './user.entity';
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

  userData: UserInfoEntity;
  userId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
    console.log(this.userId);
    this.userService.getUserInfo(this.userId).subscribe(res =>{
      console.log(res);
      // this.userData.state = data.state;
      // this.userData.id = data.id;
      // this.userData.email = data.email;
      // this.userData.info = data.info;
    });
    // console.log(this.userData);

    // if(this.userData.state != 'success') {
    //   this.router.navigate(['/404']);
    // }
  }



}
