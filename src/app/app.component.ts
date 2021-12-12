import { User, AppServiceService } from 'src/app/services/app-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username: String;
  user: User;

  constructor(private service: AppServiceService) {
    this.username = localStorage.getItem('username');

    this.service.getUser(this.username).subscribe((res: any) => {
      this.user = res;
    });
  }
}
