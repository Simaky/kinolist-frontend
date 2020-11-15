import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BackendService} from '../backend.service';
import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(
    private toastr: ToastrService,
    public backendService: BackendService,
    public userService: UserService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  public deleteUserFilmScore(filmId: number): void {
    this.backendService.deleteUserFilmScore(this.userService.getUser().id, filmId).subscribe(response => {
      if ((response as Response).status === 200) {
        window.location.reload();
      }
    }, error => {
      this.toastr.error('Internal server error: ' + error, 'Error');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
