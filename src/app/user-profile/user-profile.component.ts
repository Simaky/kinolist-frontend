import {Component, OnInit} from '@angular/core';
import {User, UserFilmsList, UserService} from '../user.service';
import {EditListDialogComponent} from '../edit-list-dialog/edit-list-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UserProfileEditComponent} from '../user-profile-edit/user-profile-edit.component';
import {BackendService} from '../backend.service';
import {UserProfileEditPasswordComponent} from '../user-profile-edit-password/user-profile-edit-password.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(public userService: UserService, public dialog: MatDialog, public backendService: BackendService) {
  }

  ngOnInit(): void {
    this.backendService.getCurrentUser().subscribe(response => {
      this.user = response;
    }, error => {
      console.log(error);
    });
  }

  public openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UserProfileEditComponent, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openEditPasswordDialog(): void {
    const dialogRef = this.dialog.open(UserProfileEditPasswordComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
