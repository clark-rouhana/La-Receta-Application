import { NgForm } from '@angular/forms';
import { AppServiceService, User } from 'src/app/services/app-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  username: String;
  bio: String;

  user: User;

  selectedFile = null;
  selectedPath = null;

  errors = { upload: '', name: '' };

  constructor(
    private modalCtrl: ModalController,
    private service: AppServiceService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.bio = localStorage.getItem('bio');

    this.service.getUser(this.username).subscribe((res: any) => {
      this.user = res;
    });
  }

  _dismiss() {
    this.modalCtrl.dismiss();
  }

  editProfile(form: NgForm) {
    const user = form.value;

    user.name = this.user.name;
    user.bio = this.user.bio;
    user.localname = this.username;
    user.localbio = this.bio;

    if (this.selectedFile === null && this.selectedPath === null) {
      user.image = this.user.image;
      user.path = this.user.path;
    } else {
      user.image = this.selectedFile;
      user.path = this.selectedPath;
    }

    this.service.edit_profile(this.user.id, user).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('username', res.username);
        if (res.bio !== null) {
          localStorage.setItem('bio', res.bio);
        }
        this._dismiss();
        window.location.reload();
      } else {
        this.errors = res;
        if (this.errors.upload) {
          document.querySelector('#span-upload').textContent =
            this.errors.upload;
        }
        if (this.errors.name) {
          document.querySelector('#proname').classList.add('error');
          document.querySelector('#span-name').textContent = this.errors.name;
        }
      }
    });
  }

  removeError(e) {
    const { value, name } = e.target;
    if (value && name === 'file') {
      document.querySelector('#proname').classList.remove('error');
      document.querySelector('#span-name').textContent = '';
    } else if (name === 'path') {
      document.querySelector('#span-upload').textContent = '';
    }
  }

  changeValue(e) {
    const { value, name, files } = e.target;
    if (name === 'file') {
      this.user.name = value;
    } else if (name === 'bio') {
      this.user.bio = value;
    } else if (name === 'path') {
      this.user.path = files[0].name;
    }
  }

  chooseFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        document
          .querySelector('#display_profile_edit')
          .setAttribute('src', event.target.result);
        this.selectedPath = event.target.result;
      };
      var str = e.target.files[0].name;
      this.selectedFile = str.replace('/[^A-Za-z0-9-]/', '');
    }
  }

  biomax() {
    const bio_textarea = (<HTMLInputElement>document.getElementById('bio'))
      .value;
    const characterCount = bio_textarea.length;
    const current = <HTMLInputElement>document.querySelector('#current');
    const maximum = <HTMLInputElement>document.querySelector('#maximum');
    const theCount = <HTMLInputElement>document.querySelector('#the-count');

    current.textContent = characterCount.toString();

    /*This isn't entirely necessary, just playin around*/
    if (characterCount < 70) {
      current.setAttribute('style', 'color: #666');
    }
    if (characterCount > 70 && characterCount < 90) {
      current.setAttribute('style', 'color: #6d5555');
    }
    if (characterCount > 90 && characterCount < 100) {
      current.setAttribute('style', 'color: #793535');
    }
    if (characterCount > 100 && characterCount < 120) {
      current.setAttribute('style', 'color: #841c1c');
    }
    if (characterCount > 120 && characterCount < 139) {
      current.setAttribute('style', 'color: #8f0001');
    }

    if (characterCount >= 140) {
      maximum.setAttribute('style', 'color: #8f0001');
      current.setAttribute('style', 'color: #8f0001');
      theCount.setAttribute('style', 'font-weight: bold');
    } else {
      maximum.setAttribute('style', 'color: #666');
      theCount.setAttribute('style', 'font-weight: normal');
    }
  }
}
