import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class Authentication implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.userService.getUser()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
