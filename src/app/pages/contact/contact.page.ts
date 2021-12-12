import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  username: String;

  errors = { name: '', email: '', subject: '', message: '' };

  constructor(private router: Router, private service: AppServiceService) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  contactUs(form: NgForm) {
    const contact = form.value;
    contact.username = this.username;
    console.log(contact);
    this.service.contact_us(contact).subscribe((res: any) => {
      if (res.success) {
        this.router.navigateByUrl('home').then(() => {
          window.location.reload();
        });
      } else {
        this.errors = res;
        if (this.errors.name) {
          document.querySelector('#span-name').textContent = this.errors.name;
        }
        if (this.errors.email) {
          document.querySelector('#span-email').textContent = this.errors.email;
        }
        if (this.errors.subject) {
          document.querySelector('#span-subject').textContent =
            this.errors.subject;
        }
        if (this.errors.message) {
          document.querySelector('#span-message').textContent =
            this.errors.message;
        }
      }
    });
  }

  removeError(e) {
    const { value, name } = e.target;
    if (value && name === 'name') {
      document.querySelector('#span-name').textContent = '';
    } else if (value && name === 'email') {
      document.querySelector('#span-email').textContent = '';
    } else if (value && name === 'subject') {
      document.querySelector('#span-subject').textContent = '';
    } else if (value && name === 'message') {
      document.querySelector('#span-message').textContent = '';
    }
  }
}
