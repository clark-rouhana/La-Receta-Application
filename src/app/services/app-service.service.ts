import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id?: String;
  name: String;
  email: String;
  password: String;
  bio: String;
  image: String;
  path: String;
  recipes: String;
}

export interface Recipe {
  id?: String;
  username: String;
  title: String;
  caption: String;
  ingredients: String;
  instructions: String;
  category: String;
  image: String;
  path: String;
}

export interface Contact {
  id?: String;
  username: String;
  name: String;
  email: String;
  subject: String;
  message: String;
}

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  private base_url = 'http://localhost/La_Receta/src/php/';

  constructor(private http: HttpClient) {}

  loginUser(user: User) {
    return this.http.post(this.base_url + 'login.php', user);
  }

  registerUser(user: User) {
    return this.http.post(this.base_url + 'register.php', user);
  }

  createRecipe(recipe: Recipe) {
    return this.http.post(this.base_url + 'createRecipe.php', recipe);
  }

  getRecipe(id) {
    return this.http.get<Recipe>(this.base_url + 'getRecipe.php?id=' + id);
  }

  getUser(username) {
    return this.http.get<User>(
      this.base_url + 'getUser.php?username=' + username
    );
  }

  editRecipe(id, recipe: Recipe) {
    return this.http.put(this.base_url + 'editRecipe.php?id=' + id, recipe);
  }

  getAllrecipes(username) {
    if (username === 'allRec') {
      return this.http.get<Recipe>(
        this.base_url + 'getAllRecipes.php?username=' + username
      );
    } else {
      return this.http.get<Recipe>(
        this.base_url + 'getAllRecipes.php?username=' + JSON.stringify(username)
      );
    }
  }

  getAllUsers(username) {
    return this.http.get<User>(
      this.base_url + 'getAllUsers.php?username=' + JSON.stringify(username)
    );
  }

  delete_recipe(id, username) {
    return this.http.delete(
      this.base_url + 'deleteRecipe.php?id=' + id + '&username=' + username
    );
  }

  searchRecipes(term: String) {
    return this.http.get<Recipe>(
      this.base_url + 'searchRecipes.php?term=' + term
    );
  }

  edit_profile(id, user: User) {
    return this.http.put(this.base_url + 'editProfile.php?id=' + id, user);
  }

  contact_us(contact: Contact) {
    return this.http.post(this.base_url + 'contactUs.php', contact);
  }
}
