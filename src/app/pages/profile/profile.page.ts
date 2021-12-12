import { Router } from '@angular/router';
import {
  AppServiceService,
  Recipe,
  User,
} from 'src/app/services/app-service.service';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  recipesAdded: any;

  recipes: Recipe[];

  username: String;
  bio: String;
  user: User;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private service: AppServiceService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.bio = localStorage.getItem('bio');

    this.service.getAllrecipes(this.username).subscribe(
      (res: any) => {
        this.recipes = res;
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.service.getUser(this.username).subscribe((res: any) => {
      this.user = res;
    });
  }

  async _openEdit() {
    const modal = await this.modalCtrl.create({
      component: EditProfileComponent,

      // cssClass: 'my-modal-component-css'
    });

    return await modal.present();
  }

  async deleteRecipe(id) {
    const toast = await this.toastCtrl.create({
      message: 'The Recipe has been deleted!',
      duration: 2000,
    });
    await this.alertCtrl
      .create({
        header: 'Delete Recipe',
        message: 'Do you wish to delete this recipe?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.service.delete_recipe(id, this.username).subscribe(() => {
                this.service.getAllrecipes(this.username).subscribe(
                  (res: any) => {
                    this.recipes = res;
                  },
                  (err: any) => {
                    console.log(err);
                  }
                );
                toast.present();
                new Promise((f) => setTimeout(f, 2000));
                window.location.reload();
              });
            },
          },
          { text: 'Cancel' },
        ],
      })
      .then((res) => res.present());
  }

  editProfile(id) {
    this.router.navigateByUrl('/create-edit/' + id);
  }
}
