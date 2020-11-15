import {Component} from '@angular/core';
import {BackendService} from './backend.service';
import {User, UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kinolist-angular';

  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(private backendService: BackendService, public userService: UserService, public router: Router) {
  }

  public onLogin(): void {
    this.errorMessage = null;

    this.backendService.loginUser(this.username, this.password).subscribe(response => {
      this.userService.setUser(response);
      window.location.reload();
    }, error => {
      this.errorMessage = error.error.message;
      setTimeout(() => this.errorMessage = null, 2500);
    });
  }

  public onLogout(): void {
    this.backendService.logout();
    this.userService.setUser(null);
    window.location.reload();
  }
}

