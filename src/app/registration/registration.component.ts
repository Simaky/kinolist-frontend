import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from '../backend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public username: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public checkBox: boolean;

  constructor(private toastr: ToastrService, private backendService: BackendService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public onRegistration(): void {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }
    if (this.password.length < 6) {
      this.toastr.error('Password should contains 6 or more symbols', 'Error');
      return;
    }
    if (!this.checkBox) {
      this.toastr.error('You have to accept private policy', 'Error');
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.toastr.error('Wrong email address', 'Error');
      return;
    }

    this.backendService.registrationUser(this.username, this.email, this.password).subscribe(response => {
      this.toastr.success('Successfully registered, you can login now', 'Success');
      this.router.navigate(['/']);
    });
  }

  private validateEmail(email): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
