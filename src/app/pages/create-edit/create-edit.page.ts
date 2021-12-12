import {
  AppServiceService,
  Recipe,
} from 'src/app/services/app-service.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.page.html',
  styleUrls: ['./create-edit.page.scss'],
})
export class CreateEditPage implements OnInit {
  isEdit: boolean;
  id: any;
  loading: boolean;

  selectedFile = null;
  selectedPath = null;

  recipe: Recipe;

  username: String;

  errors = {
    upload: '',
    title: '',
    caption: '',
    ingredients: '',
    instructions: '',
    category: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppServiceService
  ) {
    this.route.params.subscribe((data: any) => {
      this.id = data.type;
      if (data.type === 'add') {
        this.isEdit = false;
      } else {
        this.loading = false;
        this.isEdit = true;

        this.service.getRecipe(data.type).subscribe((data: any) => {
          this.recipe = data;
        });
      }
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  updateRecipe(form: NgForm) {
    const recipe = form.value;

    recipe.title = this.recipe.title;
    recipe.caption = this.recipe.caption;
    recipe.instructions = this.recipe.instructions;
    recipe.ingredients = this.recipe.ingredients;
    recipe.category = this.recipe.category;

    if (this.selectedFile === null && this.selectedPath === null) {
      recipe.image = this.recipe.image;
      recipe.path = this.recipe.path;
    } else {
      recipe.image = this.selectedFile;
      recipe.path = this.selectedPath;
    }

    this.service.editRecipe(this.id, recipe).subscribe((res: any) => {
      if (res.success) {
        this.loading = false;
        this.router.navigateByUrl('profile').then(() => {
          window.location.reload();
        });
      } else {
        this.loading = false;
        this.errors = res;
        if (this.errors.upload) {
          document.querySelector('#span-upload').textContent =
            this.errors.upload;
        }
        if (this.errors.title) {
          document.querySelector('#title').classList.add('error');
          document.querySelector('#span-title').textContent = this.errors.title;
        }
        if (this.errors.caption) {
          document.querySelector('#caption').classList.add('error');
          document.querySelector('#span-caption').textContent =
            this.errors.caption;
        }
        if (this.errors.ingredients) {
          document.querySelector('#ingredients').classList.add('error');
          document.querySelector('#span-ingredients').textContent =
            this.errors.ingredients;
        }
        if (this.errors.instructions) {
          document.querySelector('#instructions').classList.add('error');
          document.querySelector('#span-instructions').textContent =
            this.errors.instructions;
        }
        if (this.errors.category) {
          document.querySelector('#category').classList.add('error');
          document.querySelector('#span-category').textContent =
            this.errors.category;
        }
      }
    });
  }

  addRecipe(form: NgForm) {
    this.loading = true;

    if (this.isEdit) {
      this.updateRecipe(form);
      return;
    }

    const recipe = form.value;
    recipe.username = this.username;
    recipe.image = this.selectedFile;
    recipe.path = this.selectedPath;

    this.service.createRecipe(recipe).subscribe((res: any) => {
      if (res.success) {
        this.loading = false;
        this.router.navigateByUrl('profile').then(() => {
          window.location.reload();
        });
      } else {
        this.loading = false;
        this.errors = res;
        if (this.errors.upload) {
          document.querySelector('#span-upload').textContent =
            this.errors.upload;
        }
        if (this.errors.title) {
          document.querySelector('#title').classList.add('error');
          document.querySelector('#span-title').textContent = this.errors.title;
        }
        if (this.errors.caption) {
          document.querySelector('#caption').classList.add('error');
          document.querySelector('#span-caption').textContent =
            this.errors.caption;
        }
        if (this.errors.ingredients) {
          document.querySelector('#ingredients').classList.add('error');
          document.querySelector('#span-ingredients').textContent =
            this.errors.ingredients;
        }
        if (this.errors.instructions) {
          document.querySelector('#instructions').classList.add('error');
          document.querySelector('#span-instructions').textContent =
            this.errors.instructions;
        }
        if (this.errors.category) {
          document.querySelector('#category').classList.add('error');
          document.querySelector('#span-category').textContent =
            this.errors.category;
        }
      }
    });
  }

  removeError(e) {
    const { value, name } = e.target;
    if (value && name === 'title') {
      document.querySelector('#title').classList.remove('error');
      document.querySelector('#span-title').textContent = '';
    } else if (value && name === 'caption') {
      document.querySelector('#caption').classList.remove('error');
      document.querySelector('#span-caption').textContent = '';
    } else if (value && name === 'ingredients') {
      document.querySelector('#ingredients').classList.remove('error');
      document.querySelector('#span-ingredients').textContent = '';
    } else if (value && name === 'instructions') {
      document.querySelector('#instructions').classList.remove('error');
      document.querySelector('#span-instructions').textContent = '';
    } else if (value && name === 'category') {
      document.querySelector('#category').classList.remove('error');
      document.querySelector('#span-category').textContent = '';
    } else if (name === 'image') {
      document.querySelector('#span-upload').textContent = '';
    }
  }

  changeValue(e) {
    if (this.isEdit) {
      const { value, name, files } = e.target;
      if (name === 'title') {
        this.recipe.title = value;
      } else if (name === 'caption') {
        this.recipe.caption = value;
      } else if (name === 'ingredients') {
        this.recipe.ingredients = value;
      } else if (name === 'instructions') {
        this.recipe.instructions = value;
      } else if (name === 'category') {
        this.recipe.category = value;
      } else if (name === 'image') {
        this.recipe.image = files[0].name;
      }
    }
  }

  chooseFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        document.querySelector('#img').setAttribute('src', event.target.result);
        // document
        //   .querySelector('#img')
        //   .setAttribute('src', URL.createObjectURL(e.target.files[0]));
        // console.log(event.target.result);
        this.selectedPath = event.target.result;
      };
      var str = e.target.files[0].name;
      this.selectedFile = str.replace('/[^A-Za-z0-9-]/', '');
    }
  }
}
