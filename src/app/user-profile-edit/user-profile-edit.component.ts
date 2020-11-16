import {Component, Inject, OnInit} from '@angular/core';
import {User, UserFilmsList} from '../user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RegistrationComponent} from '../registration/registration.component';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  user: User;

  constructor(
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private toastr: ToastrService,
    public backendService: BackendService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(JSON.stringify(this.data));
  }

  public onEdit(): void {
    console.log(this.user);
    if (!this.validateEmail(this.user.email)) {
      this.toastr.error('Wrong email address', 'Error');
      return;
    }

    this.backendService.editUser(this.user).subscribe(response => {
      this.toastr.success('Changes saved', 'Success');
      window.location.reload();
    }, error => {
      this.toastr.error(error.error.message, 'Error');
    });
  }

  private validateEmail(email): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
