import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService, User } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errors = { wrong: '', email: '', password: '' };

  constructor(public router: Router, private service: AppServiceService) {}

  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.router.navigateByUrl('home');
    }
  }

  login(form: NgForm) {
    const user = form.value;
    this.service.loginUser(user).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('username', res.username);
        localStorage.setItem('bio', res.bio);

        this.router.navigateByUrl('home').then(() => {
          window.location.reload();
        });
      } else {
        this.errors = res;
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

  signup() {
    this.router.navigateByUrl('register');
  }

  removeError(e) {
    const { value, name } = e.target;
    if (value && name === 'email') {
      document.querySelector('#email').classList.remove('error');
      document.querySelector('#span-email').textContent = '';
    } else if (value && name === 'password') {
      document.querySelector('#password').classList.remove('error');
      document.querySelector('#span-password').textContent = '';
    }
  }
}
