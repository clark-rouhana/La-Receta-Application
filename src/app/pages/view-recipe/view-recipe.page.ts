import { Recipe } from './../../services/app-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.page.html',
  styleUrls: ['./view-recipe.page.scss'],
})
export class ViewRecipePage implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppServiceService,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((data: any) => {
      this.service.getRecipe(data.id).subscribe((data: any) => {
        this.recipe = data;
      });
    });
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }
}
