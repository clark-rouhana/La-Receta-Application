import {
  Recipe,
  AppServiceService,
  User,
} from 'src/app/services/app-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  recipes: Recipe[];

  constructor(private service: AppServiceService) {}

  ngOnInit() {
    this.service.getAllrecipes('allRec').subscribe(
      (res: any) => {
        this.recipes = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
