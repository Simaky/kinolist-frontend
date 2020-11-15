import {Component, Inject, OnInit} from '@angular/core';
import {ChangePassword, User, UserService} from '../user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-user-profile-edit-password',
  templateUrl: './user-profile-edit-password.component.html',
  styleUrls: ['./user-profile-edit-password.component.css']
})
export class UserProfileEditPasswordComponent {
  public changePassword = new ChangePassword('', '');
  public confirmPassword: string;

  constructor(
    public dialogRef: MatDialogRef<UserProfileEditPasswordComponent>,
    private toastr: ToastrService,
    public backendService: BackendService,
    public userService: UserService) {
  }

  public onEdit(): void {
    if (this.changePassword.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }
    if (this.changePassword.password.length < 6) {
      this.toastr.error('Password should contains 6 or more symbols', 'Error');
      return;
    }

    this.backendService.changeUserPassword(this.userService.getUser().id, this.changePassword).subscribe(response => {
      this.toastr.success('Password changed', 'Success');
      window.location.reload();
    }, error => {
      this.toastr.error(error.error.message, 'Error');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
