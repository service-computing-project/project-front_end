import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { PublicDataItem } from './home.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  publicContents: PublicDataItem[];
  contentID = '5c3765bd7a2bdd000111e107';


  constructor(
    private readonly homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService
      .getAllPublicData()
      .subscribe(data => {
        this.publicContents = data.Data;
        console.log('res', data);
        console.log('this.allData', this.publicContents);
      });
  }

}
