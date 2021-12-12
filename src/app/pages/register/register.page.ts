import { NgForm } from '@angular/forms';
import { AppServiceService, User } from './../../services/app-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  errors = { name: '', email: '', password: '' };

  constructor(public router: Router, private service: AppServiceService) {}

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.router.navigateByUrl('home');
    }
  }

  register(form: NgForm) {
    const user = form.value;
    this.service.registerUser(user).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('username', res.username);

        this.router.navigateByUrl('home').then(() => {
          window.location.reload();
        });
      } else {
        this.errors = res;
        if (this.errors.name) {
          document.querySelector('#name').classList.add('error');
          document.querySelector('#span-name').textContent = this.errors.name;
        }
        if (this.errors.email) {
          document.querySelector('#email').classList.add('error');
          document.querySelector('#span-email').textContent = this.errors.email;
        }
        if (this.errors.password) {
          document.querySelector('#password').classList.add('error');
          document.querySelector('#span-password').textContent =
            this.errors.password;
        }
      }
    });
  }

  login() {
    this.router.navigateByUrl('login');
  }

  removeError(e) {
    const { value, name } = e.target;
    if (value && name === 'name') {
      document.querySelector('#name').classList.remove('error');
      document.querySelector('#span-name').textContent = '';
    } else if (value && name === 'email') {
      document.querySelector('#email').classList.remove('error');
      document.querySelector('#span-email').textContent = '';
    } else if (value && name === 'password') {
      document.querySelector('#password').classList.remove('error');
      document.querySelector('#span-password').textContent = '';
    }
  }
}
