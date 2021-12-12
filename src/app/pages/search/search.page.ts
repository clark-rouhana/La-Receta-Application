import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  AppServiceService,
  Recipe,
} from 'src/app/services/app-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  recipes: Recipe[];

  constructor(private service: AppServiceService) {}

  ngOnInit() {
    this.service.getAllrecipes("allRec").subscribe(
      (res: any) => {
        this.recipes = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  search(e) {
    this.service.searchRecipes(e.target.value).subscribe((res: any) => {
      this.recipes = res;
    });
  }

}
