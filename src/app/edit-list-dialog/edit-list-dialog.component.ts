import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Score, UserFilmsList, UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-edit-list-dialog',
  templateUrl: './edit-list-dialog.component.html',
  styleUrls: ['./edit-list-dialog.component.css']
})
export class EditListDialogComponent implements OnInit {
  userFilmsList: UserFilmsList;

  constructor(
    private toastr: ToastrService,
    public backendService: BackendService,
    public userService: UserService,
    public dialogRef: MatDialogRef<EditListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFilmsList) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userFilmsList = JSON.parse(JSON.stringify(this.data));
  }

  public editUserFilmScore(userFilmsList: UserFilmsList): void {
    if (userFilmsList.score.rating > 10 || userFilmsList.score.rating < 0) {
      this.toastr.warning('Rating should be between 0 and 10', 'Error');
      return;
    }
    if (userFilmsList.score.currentState > userFilmsList.seriesCount || userFilmsList.score.currentState < 0) {
      this.toastr.warning('Progress should be between 0 and ' + userFilmsList.seriesCount, 'Error');
      return;
    }
    this.backendService.editUserFilmScore(this.userService.getUser().id, userFilmsList.filmId, userFilmsList.score).subscribe(response => {
      if ((response as Response).status === 200) {
        window.location.reload();
      }
    }, error => {
      this.toastr.error('Internal server error: ' + error, 'Error');
    });
  }

}
