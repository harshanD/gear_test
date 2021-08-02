import {Component, OnInit} from '@angular/core';
import construct = Reflect.construct;
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'frond-end';
  isAuthenticated = false;

  constructor(public authService: AuthService) {
    this.isAuthenticated = this.authService.logged()
  }

  logout() {
    this.authService.logout()
  }
}
